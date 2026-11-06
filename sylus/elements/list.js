// The student list: one row per student with their groups. Click a row to see
// everything recorded about them on the right side of the page.
window.SL = window.SL || {};

SL.list = {
  everyone: [],     // every student, from the output file
  shown: null,      // ids matching the current search, or null for everyone
  grade: '',        // the one grade to show, or '' for all
  fieldLabels: {},  // nicer names for students.csv columns, from settings/groups.json

  render() {
    const { everyone, shown, grade } = SL.list;
    const people = everyone.filter(p => (!shown || shown.includes(p.student_id)) && (!grade || p.grade === grade)).sort(SL.sort.compare);
    SL.$('count').textContent = `${people.length} of ${everyone.length} students`;
    const list = SL.$('list');
    list.replaceChildren();
    if (people.length === 0) {
      list.append(SL.el('div', 'empty', 'No students match.'));
      return;
    }
    for (const person of people) list.append(SL.list.row(person));
  },

  row(person) {
    const { el } = SL;
    const item = el('div', 'row');
    item.dataset.id = person.student_id;
    const head = el('button', 'row-head');
    head.type = 'button';

    const who = el('div', 'who', `${person.first_name} ${person.last_name}`);
    const under = SL.list.under(person);
    if (under) who.append(el('small', null, under));
    head.append(who, el('div', 'grade', SL.gradeName(person.grade)), SL.list.rowTags(person));

    // Shows the student on the right; clicking them again clears it.
    const selected = SL.list.selected === person.student_id;
    item.classList.toggle('selected', selected);
    head.setAttribute('aria-pressed', String(selected));
    head.addEventListener('click', () => SL.list.select(SL.list.selected === person.student_id ? null : person));

    item.append(head);
    return item;
  },

  selected: null,   // the student shown on the right, or null

  under: person => [person.graduation_year && `Class of ${person.graduation_year}`, person.counselor].filter(Boolean).join(' · '),

  // The two tags next to a name in the list: their current club position and their
  // current team. A tag with nothing to show is left out. (Everything else is on the right.)
  rowTags(person, today = new Date()) {
    const { el } = SL;
    const tags = el('div', 'groups');
    const tag = (type, text) => {
      const chip = el('span', 'chip');
      chip.append(el('b', null, `${type} `), text);
      tags.append(chip);
    };
    const club = SL.list.currentClub(person.records?.clubs ?? [], today);
    if (club) tag('Club', [club.club, club.role].filter(Boolean).join(' · '));
    const team = SL.list.currentTeam(person.records?.athletics ?? [], today);
    if (team) tag('Team', [team.sport, team.level].filter(Boolean).join(' · '));
    return tags;
  },

  // The club where they hold a position (any role but Member), else the one they joined
  // most recently. Clubs starting in the future don't count yet.
  currentClub(rows, today = new Date()) {
    const now = today.toISOString().slice(0, 10);
    const started = rows.filter(r => r.club && (!r.start_date || r.start_date <= now))
      .sort((a, b) => String(b.start_date ?? '').localeCompare(String(a.start_date ?? '')));
    return started.find(r => r.role && !/^member$/i.test(r.role)) ?? started[0] ?? null;
  },

  // Their team this season if they have one (Fall Aug-Nov, Winter Dec-Feb, Spring Mar-Jul),
  // else their last team listed.
  currentTeam(rows, today = new Date()) {
    const month = today.getMonth() + 1;
    const season = month >= 8 && month <= 11 ? 'fall' : month === 12 || month <= 2 ? 'winter' : 'spring';
    const teams = rows.filter(r => r.sport);
    return teams.find(r => String(r.season ?? '').toLowerCase() === season) ?? teams.at(-1) ?? null;
  },

  // Every group tag, for the student shown on the right.
  groupTags(person) {
    const { el } = SL;
    const groups = el('div', 'groups');
    for (const g of person.groups) {
      const chip = el('span', 'chip');
      chip.append(el('b', null, `${g.type} `), g.detail ? `${g.name} · ${g.detail}` : g.name);
      groups.append(chip);
    }
    if (person.groups.length === 0) groups.append(el('span', 'none', 'No groups yet'));
    return groups;
  },

  // Fills the right side with everything about one student (or the hint, for null).
  select(person) {
    const { el } = SL;
    SL.list.selected = person?.student_id ?? null;
    for (const row of SL.$('list').querySelectorAll('.row')) {
      const on = row.dataset.id === SL.list.selected;
      row.classList.toggle('selected', on);
      row.querySelector('.row-head').setAttribute('aria-pressed', String(on));
    }
    const pane = SL.$('detail');
    pane.replaceChildren();
    pane.scrollTop = 0;
    if (!person) return pane.append(el('div', 'detail-empty', 'Click a student to see everything about them.'));

    const head = el('div', 'detail-head');
    head.append(el('h2', null, `${person.first_name} ${person.last_name}`));
    const under = [SL.gradeName(person.grade), SL.list.under(person)].filter(Boolean).join(' · ');
    head.append(el('small', null, under));
    pane.append(head, SL.list.details(person));
  },

  // Columns of students.csv already shown in the row, so the profile leaves them out.
  inRow: ['student_id', 'first_name', 'last_name', 'preferred_name', 'grade', 'counselor', 'groups', 'records'],

  // A small copy icon (two overlapping pages) that copies `text`, then shows a tick
  // for a moment, or a cross if the browser wouldn't allow it.
  copyButton(text) {
    const button = SL.el('button', 'copy');
    button.type = 'button';
    button.title = `Copy ${text}`;
    button.setAttribute('aria-label', `Copy ${text}`);
    const show = shape => button.replaceChildren(SL.list.icon(shape));
    show('copy');
    button.addEventListener('click', async () => {
      const ok = await SL.copyText(text);
      show(ok ? 'done' : 'failed');
      button.title = ok ? 'Copied' : "Couldn't copy";
      setTimeout(() => { show('copy'); button.title = `Copy ${text}`; }, 1500);
    });
    return button;
  },

  // Line icons drawn in the text colour: 'copy', 'done' (tick) or 'failed' (cross).
  icon(shape) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    const parts = {
      copy: [['rect', { x: 5.5, y: 5.5, width: 8, height: 8, rx: 1.5 }],
             ['path', { d: 'M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5' }]],
      done: [['path', { d: 'M3 8.5l3 3 7-7' }]],
      failed: [['path', { d: 'M4 4l8 8M12 4l-8 8' }]],
    }[shape];
    for (const [tag, attrs] of parts) {
      const part = document.createElementNS(ns, tag);
      for (const [name, value] of Object.entries(attrs)) part.setAttribute(name, value);
      svg.append(part);
    }
    return svg;
  },

  details(person) {
    const { el } = SL;
    const box = el('div', 'details');

    // Profile: the rest of the student's own columns (email, gender, shirt size...), with no
    // heading of its own, straight under the name.
    const fieldLabel = column => SL.titleCase(SL.list.fieldLabels[column] ?? SL.label(column));
    const profile = Object.entries(person).filter(([column, value]) => value && !SL.list.inRow.includes(column));
    if (profile.length) {
      const section = el('div', 'section');
      const list = el('ul', 'profile');
      for (const [column, value] of profile) {
        const item = el('li');
        item.append(el('b', null, `${fieldLabel(column)}: `), value);
        if (/email/i.test(column)) item.append(SL.list.copyButton(value));
        list.append(item);
      }
      section.append(list);
      box.append(section);
    }

    // A group with nothing recorded for this student isn't shown at all.
    for (const [file, rows] of Object.entries(person.records)) {
      if (rows.length === 0) continue;
      const section = el('div', 'section');
      section.append(el('h3', null, SL.titleCase(SL.label(file))));
      const list = el('ul');
      for (const r of rows) list.append(el('li', null, Object.values(r).filter(Boolean).join(' · ')));
      section.append(list);
      box.append(section);
    }
    return box;
  },
};
