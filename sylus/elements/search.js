// Reads what's typed in the search box: names, grades, counselors, clubs, teams,
// roles, "not ..." and messy spelling. No AI: just the rules below plus
// settings/groups.json and settings/synonyms.json (copied in by the build).
//
// SL.createSearch(data) returns { search(text), suggest(text) }.
window.SL = window.SL || {};

SL.createSearch = function ({ people, groupTypes, synonyms, studentFields = {} }) {
  const { normalize, editDistance, matchStudents, findStudents } = SL;
  const words = text => normalize(text).split(' ').filter(Boolean);

  // Tidies what people actually type before reading it: "isn't" -> "isnt", "hale's" -> "hale",
  // "w/o" -> "without", "g11" -> "g 11".
  function clean(text) {
    return String(text ?? '')
      .toLowerCase()
      .replace(/\bw\/o\b/g, ' without ')
      .replace(/\bw\//g, ' with ')
      .replace(/(\w)n['’]t\b/g, '$1nt')
      .replace(/['’]s\b/g, '')
      .replace(/([a-z])(\d)/g, '$1 $2');
  }

  // Equal, or only a plural "s" apart.
  function sameWordExact(typed, known) {
    return typed === known || typed === known + 's' || typed + 's' === known || typed === known + 'es';
  }

  // Equal, plural, or a small typo: one slip for words of 4+ letters, two for 6+.
  // "juinors" is one slip away from "juniors", so plurals are compared both ways.
  function sameWord(typed, known) {
    if (sameWordExact(typed, known)) return true;
    if (typed.length < 4 || known.length < 4) return false;
    const allowed = Math.min(typed.length, known.length) >= 6 ? 2 : 1;
    return editDistance(typed, known) <= allowed || editDistance(typed, known + 's') <= allowed;
  }

  // ---- Everything the search box can recognise, built once ----

  const entries = [];
  // `partial` entries are pieces of a longer name ("food bank" from "Harbor Food Bank");
  // they only count when nothing else matches the same words.
  const add = (text, cond, partial = false) => {
    const w = words(text);
    if (w.length) entries.push({ words: w, cond, partial });
  };
  const wordList = key => new Set((synonyms[key] ?? []).map(normalize));
  const ignore = wordList('ignore'), not = wordList('not'), notEnds = wordList('not_ends');

  for (const grade of new Set(people.map(p => p.grade).filter(Boolean))) {
    const cond = { kind: 'grade', value: grade, label: SL.gradeName(grade) };
    for (const text of [`grade ${grade}`, `${grade}th grade`, `${grade}th grader`, `${grade}th`, grade]) add(text, cond);
  }
  for (const [word, grade] of Object.entries(synonyms.grades ?? {})) {
    add(word, { kind: 'grade', value: grade, label: SL.gradeName(grade) });
  }

  for (const counselor of new Set(people.map(p => p.counselor).filter(Boolean))) {
    const cond = { kind: 'counselor', value: counselor, label: `Counselor: ${counselor}` };
    add(counselor, cond);
    const last = words(counselor).at(-1);
    if (last) add(last, cond);  // "Hale" as well as "Ms. Hale"
  }

  for (const type of groupTypes) {
    const typeWords = new Set(type.words.flatMap(words));
    for (const w of type.words) add(w, { kind: 'type', value: type.label, label: `Any ${type.label.toLowerCase()}` });

    for (const name of new Set(people.flatMap(p => p.groups.filter(g => g.type === type.label).map(g => g.name)))) {
      const cond = { kind: 'group', value: name, label: `${type.label}: ${name}` };
      add(name, cond);
      // Any run of words from the name also finds it: "food bank", "harbor", "environmental".
      const all = words(name);
      for (let start = 0; start < all.length; start++) {
        for (let end = start + 1; end <= all.length; end++) {
          const piece = all.slice(start, end);
          if (piece.length === all.length) continue;
          if (piece.every(w => typeWords.has(w) || ignore.has(w) || w.length < 3)) continue;
          add(piece.join(' '), cond, true);
        }
      }
    }
  }

  // Columns of students.csv like gender, shirt size and graduation year. A value of 3+
  // letters works on its own ("girls", "medium", "2028"); a shorter one only next to one
  // of the field's words ("size M", "M shirts"), so "maya m" stays a name.
  const fieldWords = new Set();
  for (const [column, field] of Object.entries(studentFields)) {
    const valueWords = { ...(synonyms.field_values?.[column] ?? {}) };
    for (const p of people) if (p[column]) valueWords[p[column]] = p[column];
    for (const w of field.words) words(w).forEach(x => fieldWords.add(x));

    for (const [text, value] of Object.entries(valueWords)) {
      const label = / of$/i.test(field.label) ? `${field.label} ${value}` : `${field.label}: ${value}`;
      const cond = { kind: 'field', column, value, label };
      if (normalize(text).replace(/ /g, '').length >= 3) add(text, cond);
      for (const w of field.words) {
        add(`${w} ${text}`, cond);
        add(`${text} ${w}`, cond);
      }
    }
  }

  for (const detail of new Set(people.flatMap(p => p.groups.map(g => g.detail)).filter(Boolean))) {
    add(detail, { kind: 'detail', values: [detail], label: detail });
  }
  for (const [word, values] of Object.entries(synonyms.details ?? {})) {
    add(word, { kind: 'detail', values, label: values.join(' / ') });
  }

  // Every word the search knows, for splitting run-together words like "foodbank".
  const nameWords = new Set(people.flatMap(p => words(`${p.first_name} ${p.last_name} ${p.preferred_name ?? ''}`)));
  const known = [...new Set([...ignore, ...not, ...notEnds, ...entries.flatMap(e => e.words), ...nameWords])];
  const isKnown = w => /^\d+$/.test(w) || known.some(k => sameWordExact(w, k));
  const inSet = (set, word, same) => [...set].find(w => same(word, w));

  function split(word) {
    for (let at = 2; at <= word.length - 2; at++) {
      const a = word.slice(0, at), b = word.slice(at);
      if (isKnown(a) && isKnown(b)) return [a, b];
    }
    return null;
  }

  // ---- Reading a search ----

  // Turns the search text into conditions. Longest phrases are matched first, so
  // "vice president" wins over "president"; exact matches are tried before typo
  // matches everywhere. A "not" word marks what follows as excluded until a word
  // like "but" or "who". Leftover words are tried as student names.
  function understand(text) {
    const typed = words(clean(text));
    if (typed.length === 0) return { conds: [], ignored: [], fixed: [] };

    // The whole search is exactly a student's name: just that.
    const named = matchStudents(typed.join(' '), people);
    if (named.score === 3) {
      return { conds: [{ kind: 'students', ids: named.students.map(s => s.student_id), label: `Name: ${text.trim()}` }], ignored: [], fixed: [] };
    }

    // The vocabulary entries that match the words starting at position i, trying
    // phrases of up to 4 words down to `shortest`.
    function lookup(i, same, shortest = 1) {
      for (let n = Math.min(4, typed.length - i); n >= shortest; n--) {
        const slice = typed.slice(i, i + n);
        let matched = entries.filter(e => e.words.length === n && e.words.every((w, k) => same(slice[k], w)));
        if (matched.some(e => !e.partial)) matched = matched.filter(e => !e.partial);
        // A word for a kind of group beats the same word as a role: "volunteers" means
        // service, even when an event also has a Volunteer role.
        if (matched.some(e => e.cond.kind === 'type')) matched = matched.filter(e => e.cond.kind !== 'detail');
        if (matched.length) return { matched, length: n };
      }
      return null;
    }

    const conds = [];
    const leftover = [];   // { word, negated }
    const fixed = [];      // typos that were corrected, to show on the page
    let negated = false;
    let i = 0;
    while (i < typed.length) {
      const word = typed[i];

      // Known phrases of two or more words first, so "class of 2028" and "vice president"
      // aren't broken up by small words like "of".
      let found = lookup(i, sameWordExact, 2);

      // Small words, exactly: "not", "but", "in", "the"...
      if (!found) {
        if (inSet(not, word, sameWordExact)) { negated = true; i++; continue; }
        if (inSet(notEnds, word, sameWordExact)) { negated = false; i++; continue; }
        if (inSet(ignore, word, sameWordExact)) { i++; continue; }
      }

      // Then data and synonyms exactly. A word that is exactly part of a student's name
      // stays a name rather than being read as a typo of something else ("nair" isn't "fair").
      if (!found) found = lookup(i, sameWordExact);
      if (!found && nameWords.has(word)) { leftover.push({ word, negated }); i++; continue; }
      if (!found) {
        found = lookup(i, sameWord);
        if (found) fixed.push(`${typed.slice(i, i + found.length).join(' ')} → ${found.matched[0].words.join(' ')}`);
      }
      if (found) {
        // In "not varsity athletes" the "athletes" is who we're talking about, not
        // something to exclude: a kind word right after an excluded club/team/role stays positive.
        const previous = conds.at(-1);
        const describes = negated && previous?.negated && ['group', 'detail'].includes(previous.kind);
        for (const { cond } of found.matched) {
          const exclude = negated && !(describes && cond.kind === 'type');
          const c = exclude ? { ...cond, negated: true, label: `Not ${cond.label}` } : cond;
          if (!conds.some(x => x.label === c.label)) conds.push(c);
        }
        // "Not" before one trait of a student (grade, counselor, gender, shirt size...) covers
        // just that trait: "not girls in robotics" = Robotics members who aren't girls.
        if (negated && found.matched.every(({ cond }) => ['grade', 'counselor', 'field'].includes(cond.kind))) negated = false;
        i += found.length;
        continue;
      }

      // Small words with a typo ("whcih", "isnt" misspelt "isint").
      const notTypo = inSet(not, word, sameWord);
      if (notTypo) { negated = true; fixed.push(`${word} → ${notTypo}`); i++; continue; }
      if (inSet(notEnds, word, sameWord)) { negated = false; i++; continue; }
      if (inSet(ignore, word, sameWord)) { i++; continue; }

      // A field word on its own ("shirts", "gender") adds nothing to the search.
      if (fieldWords.has(word)) { i++; continue; }

      // Two words typed without a space: "juniorsin" -> "juniors in".
      const parts = split(word);
      if (parts) { typed.splice(i, 1, ...parts); continue; }

      leftover.push({ word, negated });
      i++;
    }

    // Leftover words as names. Try them together ("priya nair"), else one at a time.
    const ignored = [];
    for (const flag of [false, true]) {
      const group = leftover.filter(l => l.negated === flag).map(l => l.word);
      if (!group.length) continue;
      const together = findStudents(group.join(' '), people);
      const results = together.length ? [{ words: group, found: together }]
        : group.map(w => ({ words: [w], found: findStudents(w, people) }));
      for (const r of results) {
        if (!r.found.length) { ignored.push(...r.words); continue; }
        const label = `${flag ? 'Not ' : ''}Name: ${r.words.join(' ')}`;
        conds.push({ kind: 'students', ids: r.found.map(s => s.student_id), label, negated: flag });
      }
    }
    return { conds, ignored, fixed };
  }

  // ---- Checking a student against the conditions ----

  const sameText = (a, b) => normalize(a) === normalize(b);
  const byKind = (conds, kind) => conds.filter(c => c.kind === kind);

  // Within one kind any can match ("robotics debate" = either club); different kinds
  // must all match.
  function fits(person, conds) {
    const grade = byKind(conds, 'grade'), counselor = byKind(conds, 'counselor'), named = byKind(conds, 'students');
    if (grade.length && !grade.some(c => c.value === person.grade)) return false;
    if (counselor.length && !counselor.some(c => sameText(c.value, person.counselor))) return false;
    if (named.length && !named.some(c => c.ids.includes(person.student_id))) return false;
    // Gender, shirt size, graduation year...: any value of the same column can match.
    const fields = byKind(conds, 'field');
    for (const column of new Set(fields.map(c => c.column))) {
      if (!fields.some(c => c.column === column && sameText(c.value, person[column]))) return false;
    }
    return inGroup(person, conds);
  }

  // Club, team and role conditions must hold for the same group:
  // "robotics president" means president *of Robotics*.
  function inGroup(person, conds) {
    const type = byKind(conds, 'type'), group = byKind(conds, 'group'), detail = byKind(conds, 'detail');
    if (!type.length && !group.length && !detail.length) return true;
    return person.groups.some(g =>
      (!type.length || type.some(c => c.value === g.type)) &&
      (!group.length || group.some(c => sameText(c.value, g.name))) &&
      (!detail.length || detail.some(c => c.values.some(v => sameText(v, g.detail)))));
  }

  // Positive conditions must fit. Each excluded grade, counselor, name or field rules a student
  // out on its own; excluded club/team/role conditions rule out students who have a
  // group matching them together ("not robotics president" keeps Robotics members).
  function passes(person, conds) {
    const yes = conds.filter(c => !c.negated);
    const no = conds.filter(c => c.negated);
    if (!fits(person, yes)) return false;
    for (const c of no.filter(c => ['grade', 'counselor', 'students', 'field'].includes(c.kind))) {
      if (fits(person, [c])) return false;
    }
    const noGroups = no.filter(c => ['type', 'group', 'detail'].includes(c.kind));
    return !(noGroups.length && inGroup(person, noGroups));
  }

  // ---- What the page calls ----

  // Which students match, and how the search was read.
  function search(text) {
    const { conds, ignored, fixed } = understand(text);
    const ids = conds.length || ignored.length
      ? people.filter(p => conds.length && passes(p, conds)).map(p => p.student_id)
      : people.map(p => p.student_id);
    return { understood: conds.map(c => c.label), ignored, fixed, ids };
  }

  // Suggestions while typing: students first, then groups and counselors.
  // Matches the whole text, or failing that its last word (keeping what came before).
  function suggest(text) {
    const typed = words(text);
    if (typed.length === 0) return [];

    const attempt = (query, before) => {
      const students = [], groups = [];
      const prefix = before ? before + ' ' : '';
      for (const s of findStudents(query, people).slice(0, 5)) {
        students.push({ text: `${s.first_name} ${s.last_name}`, kind: `Student · ${SL.gradeName(s.grade)}`, value: prefix + `${s.first_name} ${s.last_name}` });
      }
      const q = normalize(query);
      const seen = new Set();
      for (const p of people) {
        for (const g of [...p.groups, { type: 'Counselor', name: p.counselor }]) {
          const key = `${g.type}|${g.name}`;
          if (!g.name || seen.has(key)) continue;
          if (words(g.name).some((w, k, all) => all.slice(k).join(' ').startsWith(q))) {
            seen.add(key);
            groups.push({ text: g.name, kind: g.type, value: prefix + g.name });
          }
        }
      }
      // After other words ("juniors in ro") a group is the likely ending, so groups go first.
      return (before ? [...groups, ...students] : [...students, ...groups]).slice(0, 8);
    };

    const whole = attempt(text, '');
    if (whole.length || typed.length === 1) return whole;
    return attempt(typed.at(-1), typed.slice(0, -1).join(' '));
  }

  return { search, suggest };
};
