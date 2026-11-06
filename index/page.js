// Index (the entry tool) page: add-student form, group sections, counselor ranges, and the student list.
(function () {
  const $ = id => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  // Title case, like Sylus (SL.titleCase): "service hours" -> "Service Hours", "class of" -> "Class of".
  const titleCase = text => String(text).split(' ').map((word, i) =>
    i > 0 && /^(of|and|or|the|a|an|in|on|at|to|for|by)$/i.test(word) ? word.toLowerCase()
      : word === word.toUpperCase() && word.length > 1 ? word
      : word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  // A column name as words, like Sylus shows it: "school_id" -> "School ID".
  const words = name => titleCase(name.replace(/_/g, ' ').replace(/\bid\b/gi, 'ID'));

  async function api(url, body) {
    const res = await fetch(url, body === undefined ? undefined : {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    return res.json();
  }

  function showMessage(box, { errors, text }) {
    box.replaceChildren();
    if (errors?.length) {
      const list = el('div', 'error');
      for (const e of errors) list.append(el('div', null, e));
      box.append(list);
    } else if (text) box.append(el('div', 'ok', text));
  }

  // The pop-up that asks first, listing any `issues` in red. Resolves true only if `action`
  // is pressed; Cancel, Esc and clicking outside it all mean no.
  function askFirst(question, action, { issues = [], look = 'danger' } = {}) {
    const box = $('confirm-dialog'), yes = $('confirm-yes'), list = $('confirm-issues');
    $('confirm-question').textContent = question;
    list.replaceChildren(...issues.map(issue => el('li', null, issue)));
    list.hidden = issues.length === 0;
    yes.textContent = action;
    yes.className = look;
    return new Promise(resolve => {
      const answer = sure => { box.close(); resolve(sure); };
      yes.onclick = () => answer(true);
      $('confirm-no').onclick = () => answer(false);
      box.oncancel = () => answer(false);
      box.onclick = event => { if (event.target === box) answer(false); };
      box.showModal();
    });
  }

  // ---- Current students and dropdown choices ----

  let current = { students: [], groups: {} };

  function showState(state) {
    current = state;
    for (const section of Object.values(groupSections)) section.show();
    showStudents();
    showExtraBoxes(state.extraColumns ?? []);
  }

  // Does a student belong in a list searched for `typed`? Names match as on Sylus, small typos
  // included; `details` are the other things in that list, like a role.
  function inSearch(person, typed, details) {
    const wanted = SL.normalize(typed);
    if (!wanted || SL.findStudents(typed, [person]).length) return true;
    return details.some(detail => SL.normalize(detail).includes(wanted));
  }

  // The second sort, for students the first one ties, like everyone in the same grade.
  const thenSort = { by: 'last_name', ascending: true };
  const compareStudents = (a, b) => SL.sort.column(SL.sort.by, SL.sort.ascending)(a, b)
    || SL.sort.column(thenSort.by, thenSort.ascending)(a, b) || SL.sort.compare(a, b);

  // The students the search box and grade menu leave showing.
  const shownStudents = () => current.students.filter(s => (!$('grade-only').value || s.grade === $('grade-only').value)
    && inSearch(s, $('students-search').value, [s.school_id, SL.gradeName(s.grade), s.counselor]));

  // The Students list: names with their grade, in the order the sort controls set.
  function showStudents() {
    const list = $('students');
    SL.sort.gradeMenu($('grade-only'), current.students);
    const shown = shownStudents().sort(compareStudents);
    $('count').textContent = shown.length === current.students.length ? `(${shown.length})` : `(${shown.length} of ${current.students.length})`;
    list.replaceChildren();
    if (shown.length === 0) list.append(el('li', 'none', 'No students match.'));
    for (const s of shown) {
      const item = el('li');
      const name = Object.assign(el('button', 'name', s.name), { type: 'button' });
      name.addEventListener('click', () => openStudent(s.student_id));
      item.append(name, ' ', el('small', null, SL.gradeName(s.grade)));
      list.append(item);
    }
  }

  // A plain box for every students.csv column the form doesn't have one for, so a column
  // added to the CSV later can be filled in too.
  function showExtraBoxes(columns) {
    const form = $('add-form');
    for (const box of form.querySelectorAll('.extra')) if (!columns.includes(box.dataset.column)) box.remove();
    for (const column of columns) {
      if (form.querySelector(`.extra[data-column="${CSS.escape(column)}"]`)) continue;
      const label = el('label', 'extra');
      label.dataset.column = column;
      const text = words(column);
      label.append(el('span', 'field', text), ' ', Object.assign(el('input'), { name: column }));
      form.querySelector('.actions').before(label);
    }
  }

  // ---- One student's pop-up ----

  const dialog = $('student-dialog');
  let shownStudent = null;

  async function openStudent(id) {
    const res = await fetch(`/api/student?id=${encodeURIComponent(id)}`);
    const details = await res.json();
    if (details.errors) return showMessage($('add-message'), details);
    const field = column => details.fields.find(f => f.column === column)?.value ?? '';
    shownStudent = { id, name: `${field('first_name')} ${field('last_name')}` };
    $('dialog-name').textContent = shownStudent.name;
    $('dialog-message').replaceChildren();

    // Profile: every column of students.csv, empty ones too, so nothing new is hidden.
    const body = $('dialog-body');
    body.replaceChildren();
    const profile = el('div', 'section');
    profile.append(el('h3', null, 'Profile'));
    const list = el('ul', 'profile');
    // Not our own student ID: it's only for Index's bookkeeping, the school doesn't use it.
    for (const f of details.fields.filter(f => f.column !== 'student_id')) {
      const text = titleCase(f.label || words(f.column));
      const item = el('li');
      item.append(el('b', null, `${text}: `), (f.column === 'grade' && f.value === '8' ? 'Incoming Freshman' : f.value) || '—');
      list.append(item);
    }
    profile.append(list);
    body.append(profile);

    // Then their rows in every other CSV, including any added later.
    for (const r of details.records) {
      const section = el('div', 'section');
      section.append(el('h3', null, words(r.file)));
      if (r.rows.length === 0) section.append(el('div', 'none', 'Nothing recorded'));
      else {
        const rows = el('ul');
        for (const row of r.rows) rows.append(el('li', null, r.columns.map(c => row[c]).filter(Boolean).join(' · ')));
        section.append(rows);
      }
      body.append(section);
    }
    dialog.showModal();
  }

  $('dialog-close').addEventListener('click', () => dialog.close());
  // Clicking the dark area around the pop-up closes it too.
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  $('delete').addEventListener('click', async () => {
    const sure = await askFirst(`Delete ${shownStudent.name} and everything recorded about them?`, 'Delete');
    if (!sure) return;
    const result = await api('/api/students/delete', { student_id: shownStudent.id });
    if (result.errors) return showMessage($('dialog-message'), result);
    const files = Object.entries(result.removed).map(([file, n]) => `${n} in ${file.replace(/_/g, ' ')}`);
    dialog.close();
    showMessage($('students-message'), {
      text: `Deleted ${result.deleted.name}${files.length ? ` and their rows (${files.join(', ')})` : ''}. ` +
        '',
    });
    showState(result.state);
  });

  // Grade, Gender and Shirt size are typed: suggestions drop down as you type, and what's
  // typed is understood ("m" is Male, "extra large" is XL) when you leave the box.
  function setUpTypedBoxes(choices) {
    for (const input of document.querySelectorAll('[data-choices]')) {
      const options = choices[input.dataset.choices];
      const box = input.parentElement.querySelector('.suggestions');
      let shown = [], active = -1;

      const highlight = () => [...box.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
      const close = () => { box.hidden = true; };
      const open = () => {
        shown = SL.choices.suggest(input.value, options);
        active = shown.length ? 0 : -1;
        // Just the names (Freshman…Senior) and letters (XS…XXL), not the other words understood.
        box.replaceChildren(...shown.map(c => {
          const item = el('li', null, c.label);
          item.setAttribute('role', 'option');
          item.addEventListener('mousedown', event => { event.preventDefault(); pick(c.value); });
          return item;
        }));
        highlight();
        box.hidden = shown.length === 0;
      };
      // Shows what was understood by its label, and tells the page ('understood') so the
      // grade can fill in the graduation year.
      const check = () => {
        const meant = SL.choices.understand(input.value, options);
        if (meant) {
          input.value = options.find(c => c.value === meant).label;
          input.dispatchEvent(new CustomEvent('understood', { detail: meant }));
        }
        const unknown = input.value.trim() !== '' && !meant;
        input.classList.toggle('unknown', unknown);
        input.setCustomValidity(unknown ? `Try one of: ${options.map(c => c.label).join(', ')}` : '');
      };
      const pick = value => { input.value = value; check(); close(); };

      input.addEventListener('focus', open);
      input.addEventListener('input', () => { input.classList.remove('unknown'); input.setCustomValidity(''); open(); });
      input.addEventListener('blur', () => { check(); close(); });
      input.addEventListener('keydown', event => {
        if (box.hidden) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          active = (active + (event.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length;
          highlight();
        } else if ((event.key === 'Enter' || event.key === 'Tab') && active >= 0 && input.value.trim()) {
          if (event.key === 'Enter') event.preventDefault();   // pick, don't send the form yet
          pick(shown[active].value);
        } else if (event.key === 'Escape') close();
      });
    }
  }

  // Grade and graduation year fill each other in: this school year, 2030 is a freshman,
  // 2029 a sophomore and so on. `classOf` is { 9: '2030', ..., 12: '2027' } from the server.
  function linkGradeAndYear(classOf, gradeChoices) {
    const form = $('add-form'), grade = form.grade, year = form.graduation_year;
    const mark = (input, problem) => { input.classList.toggle('unknown', !!problem); input.setCustomValidity(problem); };
    const gradeFor = value => Object.keys(classOf).find(k => classOf[k] === value);
    const showGrade = g => { grade.value = g ? gradeChoices.find(c => c.value === g).label : ''; mark(grade, ''); };
    grade.addEventListener('understood', event => { year.value = classOf[event.detail]; mark(year, ''); fillFromName(); });
    year.addEventListener('understood', event => { showGrade(gradeFor(event.detail)); fillFromName(); });
    // Emptying one empties the other, so a grade never stays without its year.
    grade.addEventListener('input', () => { if (!grade.value.trim()) { year.value = ''; mark(year, ''); fillFromName(); } });
    year.addEventListener('input', () => {
      const typed = year.value.trim();
      const g = gradeFor(typed);
      showGrade(g);
      fillFromName();
      const years = Object.values(classOf).sort();
      mark(year, /^\d{4}$/.test(typed) && !g ? `Class of ${typed} isn't in high school this year (${years[0]} to ${years.at(-1)}).` : '');
    });
  }

  // ---- Add a student ----

  // As the name is typed: a red outline and a list of students with a name like it. It's a
  // warning only, since two students can share a name.
  const nameBox = $('add-form').student_name, nameList = $('name-similar');

  function similarStudents() {
    // Checking starts at the comma, when the last name is finished.
    if (!nameBox.value.includes(',')) return [];
    return SL.findStudents(nameBox.value.replace(/,/g, ' ').trim(), current.students).sort((a, b) => a.name.localeCompare(b.name)).slice(0, 6);
  }

  function warnAboutStudent() {
    const similar = similarStudents();
    nameBox.classList.toggle('unknown', similar.length > 0);
    nameList.replaceChildren(...similar.map(s => {
      const item = el('li', null, `${s.last_name}, ${s.first_name}`);
      item.append(el('span', 'kind', 'similar name'));
      return item;
    }));
    nameList.hidden = similar.length === 0;
  }

  // Email and Counselor fill themselves in from the name and year, and stay editable: once
  // one is edited, even emptied, it's left alone until the form is cleared.
  const addForm = $('add-form'), emailBox = addForm.email, counselorBox = addForm.counselor, counselorNote = $('counselor-note');
  let emailTyped = false, counselorTyped = false;

  const typedName = () => SL.choices.splitName(nameBox.value);
  const nameIsSet = () => !!typedName().first_name && !!typedName().last_name;
  const expectedCounselor = () => SL.choices.counselorFor(typedName().last_name, current.rules);
  const expectedEmail = () => {
    const year = addForm.graduation_year.value.trim();
    return nameIsSet() && /^\d{4}$/.test(year) ? SL.choices.schoolEmail({ ...typedName(), graduation_year: year }) : '';
  };

  // A counselor who isn't the one for this last name is flagged, but allowed.
  function checkCounselor() {
    const expected = nameIsSet() ? expectedCounselor() : '';
    const typed = counselorBox.value.trim();
    const differs = !!expected && !!typed && typed.toLowerCase() !== expected.toLowerCase();
    counselorBox.classList.toggle('unknown', differs);
    counselorNote.hidden = !differs;
    counselorNote.textContent = differs ? `Last name goes to ${expected}` : '';
  }

  function fillFromName() {
    if (!emailTyped) emailBox.value = expectedEmail();
    if (!counselorTyped) counselorBox.value = nameIsSet() ? expectedCounselor() : '';
    checkCounselor();
  }

  // The dropdown under Counselor: those in the ranges and any already on a student. Typing
  // narrows it, and any other name can still be typed.
  const counselorList = $('counselor-list');
  let counselorNames = [], counselorActive = -1;

  function pickCounselor(name) {
    counselorBox.value = name;
    counselorTyped = true;
    counselorList.hidden = true;
    checkCounselor();
  }

  function showCounselors(narrow) {
    const typed = narrow ? counselorBox.value.trim().toLowerCase() : '';
    counselorNames = [...new Set([...current.rules.map(r => r.counselor), ...current.students.map(s => s.counselor)].filter(Boolean))]
      .filter(name => name.toLowerCase().includes(typed)).sort((a, b) => a.localeCompare(b));
    counselorActive = -1;
    counselorList.replaceChildren(...counselorNames.map(name => {
      const item = el('li', null, name);
      item.setAttribute('role', 'option');
      item.addEventListener('mousedown', event => { event.preventDefault(); pickCounselor(name); });
      return item;
    }));
    counselorList.hidden = counselorNames.length === 0;
  }

  emailBox.addEventListener('input', () => { emailTyped = true; fillFromName(); });
  counselorBox.addEventListener('input', () => { counselorTyped = true; fillFromName(); showCounselors(true); });
  counselorBox.addEventListener('focus', () => showCounselors(false));
  counselorBox.addEventListener('blur', () => { counselorList.hidden = true; });
  counselorBox.addEventListener('keydown', event => {
    if (counselorList.hidden) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const count = counselorNames.length;
      counselorActive = (counselorActive + (event.key === 'ArrowDown' ? 1 : count - 1 + (counselorActive < 0 ? 1 : 0))) % count;
      [...counselorList.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === counselorActive)));
    } else if (event.key === 'Enter' && counselorActive >= 0) {
      event.preventDefault();   // pick, don't send the form yet
      pickCounselor(counselorNames[counselorActive]);
    } else if (event.key === 'Escape') counselorList.hidden = true;
  });
  nameBox.addEventListener('input', fillFromName);
  nameBox.addEventListener('input', warnAboutStudent);
  nameBox.addEventListener('focus', warnAboutStudent);
  nameBox.addEventListener('blur', () => { nameList.hidden = true; });
  nameList.addEventListener('mousedown', event => event.preventDefault());

  // A six-digit School ID nobody on file has.
  $('random-id').addEventListener('click', () => {
    const used = new Set(current.students.map(s => s.school_id));
    let id;
    do { id = String(100000 + Math.floor(Math.random() * 900000)); } while (used.has(id));
    $('add-form').school_id.value = id;
  });

  // Things worth a second look before adding; none of them stop it.
  function issuesWith(s) {
    const issues = [];
    const expected = SL.choices.counselorFor(s.last_name, current.rules);
    if (expected && s.counselor.toLowerCase() !== expected.toLowerCase()) {
      issues.push(`Counselor is ${s.counselor}, but ${s.last_name} goes to ${expected}.`);
    }
    const similar = similarStudents().map(p => `${p.last_name}, ${p.first_name}`);
    if (similar.length) issues.push(`Similar name on file: ${similar.join('; ')}.`);
    if (s.email !== SL.choices.schoolEmail(s)) issues.push("Email isn't in the school format.");
    return issues;
  }

  function clearForm(form) {
    form.reset();
    emailTyped = counselorTyped = false;
    for (const input of form.querySelectorAll('.unknown')) input.classList.remove('unknown');
    checkCounselor();
    warnAboutStudent();
  }

  // Details are checked first, so the pop-up only asks about a student who can be added.
  addForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.target, values = Object.fromEntries(new FormData(form));
    const check = await api('/api/students/check', values);
    if (check.errors) return showMessage($('add-message'), check);
    $('add-message').replaceChildren();
    const s = check.student;
    const sure = await askFirst(`Add ${s.last_name}, ${s.first_name} (${SL.gradeName(s.grade)}, class of ${s.graduation_year})?`, 'Add',
      { issues: issuesWith(s), look: 'primary' });
    if (!sure) return;
    const result = await api('/api/students', values);
    if (result.errors) return showMessage($('add-message'), result);
    showState(result.state);
    clearForm(form);
    showUndo(result.student, values);
    form.student_name.focus();
  });

  // Undo takes the last student added off again and puts their details back in the form.
  let lastAdded = null;

  function showUndo(student, values) {
    lastAdded = { student, values };
    $('undo-add').hidden = false;
    $('undo-add').title = `Undo adding ${student.first_name} ${student.last_name}`;
  }

  $('undo-add').addEventListener('click', async () => {
    const { student, values } = lastAdded;
    const result = await api('/api/students/delete', { student_id: student.student_id });
    $('undo-add').hidden = true;
    if (result.errors) return showMessage($('add-message'), result);
    showState(result.state);
    for (const [name, value] of Object.entries(values)) if (addForm[name]) addForm[name].value = value;
    emailTyped = !!values.email && values.email !== expectedEmail();
    counselorTyped = !!values.counselor && values.counselor !== expectedCounselor();
    fillFromName();
    nameBox.focus();
  });

  // ---- Copying emails ----

  // A button that copies the emails `emails()` lists, joined so they paste into a To line.
  function copiesEmails(button, emails) {
    const label = button.textContent;
    let timer;
    button.addEventListener('click', async () => {
      const list = emails().filter(Boolean);
      const copied = list.length > 0 && await SL.copyText(list.join('; '));
      button.textContent = copied ? `Copied ${list.length}` : list.length ? "Couldn't copy" : 'No emails';
      clearTimeout(timer);
      timer = setTimeout(() => { button.textContent = label; }, 1500);
    });
  }

  copiesEmails($('copy-all-emails'), () => shownStudents().map(s => s.email));

  // ---- One student's entry in a group ----

  const memberDialog = $('member-dialog');
  let saveMember = null;

  // Opens the pop-up with a box for each detail in `fields`, filled from `row`.
  function editMember({ file, fields, row, who, groupName }) {
    $('member-name').textContent = who;
    $('member-group').textContent = groupName;
    $('member-message').replaceChildren();
    const inputs = fields.map(f => Object.assign(el('input'), { name: f.column, value: row[f.column] ?? '', autocomplete: 'off' }));
    $('member-fields').replaceChildren(...fields.map((f, i) => {
      const label = el('label');
      label.append(el('span', 'field', words(f.column)), ' ', inputs[i]);
      return label;
    }));
    saveMember = async () => {
      const changes = Object.fromEntries(inputs.map(input => [input.name, input.value]));
      const result = await api(`/api/groups/${encodeURIComponent(file)}/edit`, { row, changes });
      if (result.errors) return showMessage($('member-message'), result);
      memberDialog.close();
      showState(result.state);
    };
    memberDialog.showModal();
    inputs[0]?.focus();
  }

  $('member-form').addEventListener('submit', event => { event.preventDefault(); saveMember(); });
  $('member-close').addEventListener('click', () => memberDialog.close());
  $('member-cancel').addEventListener('click', () => memberDialog.close());
  memberDialog.addEventListener('click', event => { if (event.target === memberDialog) memberDialog.close(); });

  // ---- Group sections ----

  // One fold-away section per CSV of groups (Clubs, Athletics, Events, Service Hours, and any
  // CSV added later), built from what the server says about each file. Each opens step by
  // step: first a dropdown of its groups, then once a group is chosen or named, the student
  // name lookup, a box per column of the file (dates are filled in for you), and Add.
  const NEW_GROUP = '__new group__', NEW_VALUE = '__new value__';
  const groupSections = {};

  // A dropdown that opens straight under its box, like the Grade and Gender boxes, instead
  // of the browser's own list. A hidden <select> still holds the options and the value.
  function dropdown(select) {
    const wrap = el('span', 'pick');
    const button = Object.assign(el('button', 'drop-button'), { type: 'button' });
    button.setAttribute('aria-haspopup', 'listbox');
    const list = Object.assign(el('ul', 'suggestions'), { hidden: true });
    list.setAttribute('role', 'listbox');
    select.hidden = true;
    wrap.append(select, button, list);

    let active = -1;
    const sync = () => { button.textContent = select.selectedOptions[0]?.text ?? ''; };
    const close = () => { list.hidden = true; };
    const highlight = () => [...list.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    const choose = option => {
      select.value = option.value;
      sync();
      close();
      select.dispatchEvent(new Event('change'));
    };
    const open = () => {
      list.replaceChildren(...[...select.options].map(option => {
        const item = el('li', null, option.text);
        item.setAttribute('role', 'option');
        item.addEventListener('mousedown', event => { event.preventDefault(); choose(option); });
        return item;
      }));
      active = select.selectedIndex;
      highlight();
      list.hidden = false;
    };
    button.addEventListener('click', () => (list.hidden ? open() : close()));
    button.addEventListener('blur', close);
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (list.hidden) return open();
        const count = select.options.length;
        active = (active + (event.key === 'ArrowDown' ? 1 : -1) + count) % count;
        highlight();
      } else if (event.key === 'Enter' && !list.hidden) {
        event.preventDefault();
        choose(select.options[active]);
      } else if (event.key === 'Escape') close();
    });
    return { wrap, button, sync };
  }

  // The same kind of dropdown, but its box can be typed in: the list narrows to what
  // `matches(optionText, typed)` allows, typos included, and "New…" always stays in it.
  function typeableDropdown(select, name, matches) {
    const wrap = el('span', 'pick typeable');
    const input = Object.assign(el('input'), { placeholder: 'Select', autocomplete: 'off', spellcheck: false, name });
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    const list = Object.assign(el('ul', 'suggestions'), { hidden: true });
    list.setAttribute('role', 'listbox');
    select.hidden = true;
    wrap.append(select, input, list);

    let shown = [], active = -1, typing = false, lastTyped = '';
    const sync = () => { input.value = select.value ? select.selectedOptions[0]?.text ?? '' : ''; };
    const highlight = () => [...list.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    const choose = option => {
      lastTyped = typing ? input.value.trim() : '';
      typing = false;
      select.value = option.value;
      sync();
      list.hidden = true;
      select.dispatchEvent(new Event('change'));
    };
    const open = () => {
      const typed = typing ? input.value.trim() : '';
      shown = [...select.options].filter(o => (!typed ? true : o.value === NEW_GROUP || (o.value && matches(o.text, typed))));
      list.replaceChildren(...shown.map(option => {
        const item = el('li', null, option.text);
        item.setAttribute('role', 'option');
        item.addEventListener('mousedown', event => { event.preventDefault(); choose(option); });
        return item;
      }));
      // While typing, Enter takes the best match; "New…" only if nothing matches.
      active = typed ? (shown.length > 1 ? 1 : 0) : shown.indexOf(select.selectedOptions[0]);
      highlight();
      list.hidden = false;
    };
    input.addEventListener('focus', () => { typing = false; input.select(); open(); });
    input.addEventListener('click', () => { if (list.hidden) open(); });
    input.addEventListener('input', () => { typing = true; open(); });
    input.addEventListener('blur', () => { typing = false; list.hidden = true; sync(); });
    input.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (list.hidden) return open();
        active = (active + (event.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length;
        highlight();
      } else if (event.key === 'Enter' && !list.hidden && shown[active]) {
        event.preventDefault();
        choose(shown[active]);
      } else if (event.key === 'Escape') {
        typing = false;
        list.hidden = true;
        sync();
      }
    });
    return { wrap, sync, lastTyped: () => lastTyped };
  }

  function groupSection(file, group) {
    const column = group.nameColumn;
    const kind = column.replace(/_/g, ' ');
    const url = action => `/api/groups/${encodeURIComponent(file)}/${action}`;

    // A label with its name line and control, like the Add a Student boxes.
    const box = (text, control) => {
      const label = el('label');
      label.append(el('span', 'field', text), ' ', control);
      return label;
    };

    const panel = el('details', 'panel');
    panel.dataset.group = file;
    const summary = el('summary');
    const title = el('h2', null, words(file));
    const titleGroup = el('span', 'count');   // " - Art Club" once a group is selected
    title.append(titleGroup);
    summary.append(title);
    const grid = el('div', 'form-grid');
    const choice = el('select');
    // Titled "New Club", not "New Club Name": browsers see "name" and offer people's names.
    const newName = Object.assign(el('input'), { maxLength: 60, autocomplete: 'off', name: `new-${file}` });
    const similarList = Object.assign(el('ul', 'suggestions info'), { hidden: true });
    // Clicking the list keeps the cursor in the box; nothing in it can be picked.
    similarList.addEventListener('mousedown', event => event.preventDefault());
    const newControl = el('span', 'pick');
    newControl.append(newName, similarList);
    const newLabel = box(`New ${words(kind)}`, newControl);
    newLabel.hidden = true;
    const groupDrop = typeableDropdown(choice, `pick-${file}`, (text, typed) => looksLike(text, SL.normalize(typed)));
    grid.append(box(words(kind), groupDrop.wrap), newLabel);

    const search = el('div', 'search');
    const suggestionBox = Object.assign(el('ul', 'suggestions'), { id: `${file}-suggestions`, hidden: true });
    suggestionBox.setAttribute('role', 'listbox');
    const student = Object.assign(el('input'), { autocomplete: 'off', spellcheck: false, name: `${file}-student` });
    student.setAttribute('role', 'combobox');
    student.setAttribute('aria-label', 'Student Name');
    student.setAttribute('aria-expanded', 'false');
    student.setAttribute('aria-controls', suggestionBox.id);
    student.setAttribute('aria-autocomplete', 'list');
    search.append(student, suggestionBox);
    const studentBox = el('div', 'labelled');
    studentBox.append(el('span', 'field', 'Student Name'), search);
    grid.append(studentBox);

    // A plain typed box, for numbers and notes.
    function typedField(f) {
      const input = Object.assign(el('input'), { name: f.column, autocomplete: 'off' });
      if (/hours/i.test(f.column)) input.inputMode = 'decimal';
      return { column: f.column, label: box(words(f.column), input), value: () => input.value, reset: () => { input.value = ''; }, refresh() {} };
    }

    // A dropdown of what this group already has (roles, levels...) with "New role…" at the
    // end, which turns into a box to type one. A new one joins the dropdown straight away,
    // and stays there for good once a student has it.
    function choiceField(f) {
      const word = f.column.replace(/_/g, ' ');
      const select = Object.assign(el('select'), { name: f.column });
      const typed = Object.assign(el('input'), { placeholder: `New ${word}`, maxLength: 60, hidden: true, autocomplete: 'off' });
      const drop = dropdown(select);
      drop.wrap.append(typed);
      const made = new Set();
      const values = () => [...new Set([f.default, ...members().map(m => m[f.column]), ...made].filter(Boolean))]
        .sort((a, b) => a.localeCompare(b));
      const refresh = () => {
        const keep = select.value, list = values();
        select.replaceChildren(new Option('Select', ''), ...list.map(v => new Option(v, v)), new Option(`New ${word}…`, NEW_VALUE));
        select.value = list.includes(keep) ? keep : '';
        drop.sync();
      };
      const finish = () => {
        if (typed.hidden) return;
        const text = SL.choices.titleText(typed.value.trim().replace(/\s+/g, ' '));
        const same = values().find(v => v.toLowerCase() === text.toLowerCase());
        if (text && !same) made.add(text);
        typed.value = '';
        typed.hidden = true;
        drop.button.hidden = false;
        refresh();
        select.value = same ?? text;
        drop.sync();
      };
      select.addEventListener('change', () => {
        if (select.value !== NEW_VALUE) return;
        drop.button.hidden = true;
        typed.hidden = false;
        typed.focus();
      });
      typed.addEventListener('blur', finish);
      typed.addEventListener('keydown', event => {
        if (event.key === 'Escape') typed.value = '';
        if (event.key === 'Enter' || event.key === 'Escape') { event.preventDefault(); finish(); }
      });
      return { column: f.column, label: box(words(f.column), drop.wrap), value: () => select.value, reset: () => { select.value = ''; drop.sync(); }, refresh };
    }

    const fields = group.fields.filter(f => f.type !== 'date')
      .map(f => (/hours|description/i.test(f.column) ? typedField(f) : choiceField(f)));
    for (const f of fields) grid.append(f.label);
    const addRow = el('div', 'actions');
    const add = Object.assign(el('button', 'primary', 'Add'), { type: 'button' });
    addRow.append(add);
    grid.append(addRow);

    const message = el('div', 'message');
    message.setAttribute('role', 'status');
    const heading = el('h3', 'club-heading');

    // Above the members, on the right: pick one role, and sort with Sylus's direction arrow.
    const roleColumn = group.fields.find(f => /role|position/i.test(f.column))?.column;
    const roleFilter = el('select');
    roleFilter.setAttribute('aria-label', `Show one ${roleColumn}`);
    const sortBy = el('select');
    sortBy.setAttribute('aria-label', 'Sort by');
    sortBy.append(new Option('Last name', 'last_name'), new Option('First name', 'first_name'), new Option('Grade', 'grade'));
    const sortDir = Object.assign(el('button'), { type: 'button', title: 'Ascending' });
    sortDir.setAttribute('aria-label', 'Ascending, click for descending');
    sortDir.append(SL.sort.arrowIcon());
    let ascending = true;
    const gradeOnly = el('select');
    gradeOnly.setAttribute('aria-label', 'Show one grade');
    const gradeBox = el('div', 'sort'), roleBox = el('div', 'sort'), sortBox = el('div', 'sort');
    gradeBox.append(gradeOnly);
    roleBox.append(roleFilter);
    sortBox.append(sortBy, sortDir);
    const memberControls = el('div', 'member-controls');
    memberControls.append(gradeBox);
    if (roleColumn) memberControls.append(roleBox);
    memberControls.append(sortBox);
    const memberHead = Object.assign(el('div', 'member-head'), { hidden: true });
    const copyEmails = Object.assign(el('button', 'copy-emails', 'Copy emails'), { type: 'button' });
    let shownEmails = [];
    copiesEmails(copyEmails, () => shownEmails);
    memberHead.append(heading, copyEmails, memberControls);
    const memberSearch = Object.assign(el('input', 'list-search'), { placeholder: 'Search this list', autocomplete: 'off', spellcheck: false, hidden: true });
    memberSearch.setAttribute('aria-label', `Search this ${kind}`);
    const memberList = el('ul', 'students members');
    // Under the section's title: says when a new name is taken or close to one already there.
    const warning = Object.assign(el('p', 'warning'), { hidden: true });
    const article = /^[aeiou]/.test(kind) ? 'an' : 'a';
    const description = el('p', 'hint', `Add students to ${article} ${kind}, or pick New, type a name and press Enter.`);
    panel.append(summary,
      description, warning, grid, message, memberHead, memberSearch, memberList);
    $('group-sections').append(panel);

    const typedName = () => newName.value.trim().replace(/\s+/g, ' ');
    const alreadyAGroup = () => choice.value === NEW_GROUP && Object.keys(current.groups[file].members)
      .some(n => n.toLowerCase() === typedName().toLowerCase());
    // The group being worked on: the one picked, or a new name that isn't taken.
    const chosen = () => (choice.value !== NEW_GROUP ? choice.value : alreadyAGroup() ? '' : typedName());
    // A new name counts once Enter confirms it; typing again takes that back.
    let confirmed = false;
    const ready = () => !!chosen() && (choice.value !== NEW_GROUP || confirmed);
    const members = () => current.groups[file].members[chosen()] ?? [];
    // Students can't join twice, unless the file lists them more than once (service visits).
    const taken = () => new Set(group.repeats ? [] : members().map(m => m.student_id));
    // What's shown beside a member's name: the file's columns, leaving out when they joined.
    const details = row => group.fields.filter(f => !/start/i.test(f.column)).map(f => row[f.column]).filter(Boolean).join(' · ');

    // The dropdown (existing groups plus "New…") and the chosen group's members.
    function show() {
      const keep = choice.value;
      const names = Object.keys(current.groups[file].members).sort((a, b) => a.localeCompare(b));
      // Nothing is chosen at the start: the dropdown says Select until you pick a group.
      choice.replaceChildren(new Option('Select', ''), new Option(`New ${kind}…`, NEW_GROUP), ...names.map(n => new Option(n, n)));
      choice.value = names.includes(keep) || keep === NEW_GROUP ? keep : '';
      newLabel.hidden = choice.value !== NEW_GROUP;
      groupDrop.sync();
      opened();
    }

    // Everything past the first box waits until a group is chosen, or named and confirmed.
    function opened() {
      warnAboutName();
      titleGroup.textContent = ready() ? ` - ${chosen()}` : '';
      for (const part of [studentBox, addRow, ...fields.map(f => f.label)]) part.hidden = !ready();
      for (const f of fields) f.refresh();
      showMembers();
    }

    function showMembers() {
      const name = chosen();
      const byId = Object.fromEntries(current.students.map(s => [s.student_id, s]));
      if (roleColumn) {
        const keep = roleFilter.value;
        const roles = [...new Set(members().map(m => m[roleColumn]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
        roleFilter.replaceChildren(new Option(`All ${words(roleColumn)}s`, ''), ...roles.map(r => new Option(r, r)));
        roleFilter.value = roles.includes(keep) ? keep : '';
      }
      SL.sort.gradeMenu(gradeOnly, members().map(m => byId[m.student_id]).filter(Boolean));
      const compare = SL.sort.comparer(sortBy.value, ascending);
      const rows = members()
        .filter(row => !roleColumn || !roleFilter.value || row[roleColumn] === roleFilter.value)
        .map(row => ({ row, person: byId[row.student_id] ?? {} }))
        .sort((a, b) => compare(a.person, b.person))
        .filter(({ person }) => !gradeOnly.value || person.grade === gradeOnly.value)
        .filter(({ row, person }) => inSearch(person, memberSearch.value, group.fields.map(f => row[f.column]).concat(person.school_id)))
        .map(({ row, person }) => ({ row, email: person.email, student: person.name ?? 'Unknown student' }));
      shownEmails = rows.map(r => r.email);
      memberHead.hidden = memberSearch.hidden = !name || choice.value === NEW_GROUP;   // a group being named has nobody yet
      heading.replaceChildren(`${name} `, el('span', 'count', `(${rows.length})`));
      memberList.replaceChildren();
      if (rows.length === 0 && members().length > 0) memberList.append(el('li', 'none', 'No students match.'));
      for (const { row, student: who } of rows) {
        const item = el('li', 'member');
        // The name opens a pop-up to change this entry's details.
        const text = el('span');
        const open = Object.assign(el('button', 'name', who), { type: 'button', title: `Change ${who}'s details` });
        const editable = group.fields.filter(f => f.type !== 'date');
        open.addEventListener('click', () => editMember({ file, fields: editable, row, who, groupName: name }));
        text.append(open, ' ', el('small', null, details(row)));
        const remove = Object.assign(el('button', null, 'Remove'), { type: 'button', title: `Take ${who} out of ${name}` });
        remove.addEventListener('click', async () => {
          const entry = group.repeats ? ` (${details(row)})` : '';
          if (!await askFirst(`Remove ${who} from ${name}${entry}?`, 'Remove')) return;
          remove.disabled = true;
          const result = await api(url('remove'), row);
          if (result.errors) return showMessage(message, result);
          showMessage(message, { text: `Took ${who} out of ${name}. ` });
          // Undo puts them back as they were, and stays until the next message replaces it.
          const undo = Object.assign(el('button', 'undo', 'Undo'), { type: 'button' });
          undo.addEventListener('click', async () => {
            undo.disabled = true;
            const back = await api(url('restore'), { rows: result.rows });
            if (back.errors) return showMessage(message, back);
            showMessage(message, { text: `Put ${who} back in ${name}.` });
            showState(back.state);
            // Taking out a group's last member drops it from the dropdown, so choose it again.
            choice.value = name;
            show();
          });
          message.firstChild.append(undo);
          showState(result.state);
        });
        item.append(text, remove);
        memberList.append(item);
      }
    }

    roleFilter.addEventListener('change', showMembers);
    gradeOnly.addEventListener('change', showMembers);
    memberSearch.addEventListener('input', showMembers);
    sortBy.addEventListener('change', showMembers);
    sortDir.addEventListener('click', () => {
      ascending = !ascending;
      sortDir.classList.toggle('down', !ascending);
      sortDir.title = ascending ? 'Ascending' : 'Descending';
      sortDir.setAttribute('aria-label', ascending ? 'Ascending, click for descending' : 'Descending, click for ascending');
      showMembers();
    });

    choice.addEventListener('change', () => {
      newLabel.hidden = choice.value !== NEW_GROUP;
      confirmed = false;
      // A name typed in the box that matched nothing carries over as the new group's name.
      if (!newLabel.hidden && !newName.value) newName.value = groupDrop.lastTyped();
      message.replaceChildren();
      memberSearch.value = '';   // each group starts with its whole list
      opened();
      if (!newLabel.hidden) newName.focus();
      else if (choice.value) student.focus();
    });
    // Groups that look like the name being typed, listed under the box as possibly taken once
    // two letters are in: the start of a name, or a small typo. They're only for reading.

    function looksLike(name, typed) {
      const known = SL.normalize(name);
      if (known.startsWith(typed)) return true;
      // Later words count from 3 letters, so "c" doesn't bring up every "... Club".
      if (typed.length >= 3 && known.split(' ').some(w => w.startsWith(typed))) return true;
      if (typed.length < 4) return false;
      return SL.editDistance(typed, known) <= 2 || known.split(' ').some(w => SL.editDistance(typed, w) <= 1);
    }

    const similarNames = () => {
      const typed = SL.normalize(typedName());
      return typed.length < 2 ? [] : Object.keys(current.groups[file].members).filter(n => looksLike(n, typed))
        .sort((a, b) => a.localeCompare(b)).slice(0, 6);
    };

    // The red outline and the words under the title. A taken name stops there; a similar one
    // (from three letters, so it doesn't flash up mid-word) is only a warning.
    function warnAboutName() {
      const naming = choice.value === NEW_GROUP;
      const close = naming && SL.normalize(typedName()).length >= 3 ? similarNames() : [];
      const taken = alreadyAGroup();
      warning.textContent = taken ? `${typedName()} already exists.` : `Similar to ${close.join(', ')}.`;
      warning.hidden = !taken && close.length === 0;
      description.hidden = !warning.hidden;   // the warning takes the description's place
      newName.classList.toggle('unknown', !warning.hidden);
    }

    function showSimilar() {
      const similar = similarNames();
      similarList.replaceChildren(...similar.map(name => {
        const item = el('li', null, name);
        item.append(el('span', 'kind', 'possibly taken'));
        return item;
      }));
      similarList.hidden = similar.length === 0;
    }

    newName.addEventListener('input', () => { confirmed = false; opened(); showSimilar(); });
    newName.addEventListener('focus', showSimilar);
    newName.addEventListener('blur', () => { similarList.hidden = true; });
    newName.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (chosen()) {
          confirmed = true;
          similarList.hidden = true;
          opened();
          student.focus();
        }
      } else if (event.key === 'Escape') similarList.hidden = true;
    });

    // Name suggestions above the box, like the search box on Sylus.
    // Every student on file is searched, small typos included; a pick is held until Add.
    let suggestions = [], active = -1, picked = null;

    function pick(person) {
      picked = person;
      student.value = person.name;
      suggestionBox.hidden = true;
      student.setAttribute('aria-expanded', 'false');
    }

    function suggest() {
      if (picked) return;
      const typed = student.value.trim();
      const already = taken();
      // A typed school ID finds that student directly.
      const byId = current.students.filter(s => s.school_id && s.school_id === typed);
      // First names lead: a match on the start of a first name, then a typo of one, then
      // last names. Each student is matched alone so a close first name isn't lost to an
      // exact last name.
      const first = SL.normalize(typed).split(' ')[0];
      const rank = s => {
        const name = SL.normalize(s.first_name);
        if (name.startsWith(first)) return 0;
        if (first.length >= 4 && SL.editDistance(first, name) <= 2) return 1;
        return SL.normalize(s.last_name).startsWith(first) ? 2 : 3;
      };
      suggestions = (byId.length ? byId : current.students.filter(s => SL.findStudents(typed, [s]).length))
        .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name)).slice(0, 8);
      active = suggestions.findIndex(s => !already.has(s.student_id));
      suggestionBox.replaceChildren();
      suggestions.forEach((s, i) => {
        const inGroup = already.has(s.student_id);
        const item = el('li', inGroup ? 'taken' : null, s.name);
        item.id = `${file}-suggestion-${i}`;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', String(i === active));
        item.append(el('span', 'kind', inGroup ? 'already in' : `${s.school_id ? `${s.school_id} · ` : ''}${SL.gradeName(s.grade)}`));
        item.addEventListener('mousedown', event => { event.preventDefault(); if (!inGroup) pick(s); });
        suggestionBox.append(item);
      });
      suggestionBox.hidden = suggestions.length === 0 || !typed;
      student.setAttribute('aria-expanded', String(!suggestionBox.hidden));
      student.setAttribute('aria-activedescendant', active >= 0 && !suggestionBox.hidden ? `${file}-suggestion-${active}` : '');
    }

    function moveActive(step) {
      const already = taken();
      for (let i = 1; i <= suggestions.length; i++) {
        const next = (active + step * i + suggestions.length * i) % suggestions.length;
        if (!already.has(suggestions[next].student_id)) { active = next; break; }
      }
      [...suggestionBox.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
      student.setAttribute('aria-activedescendant', active >= 0 ? `${file}-suggestion-${active}` : '');
    }

    async function addMember() {
      const already = taken();
      const open = suggestions.filter(s => !already.has(s.student_id));
      const person = picked ?? (student.value.trim() && open.length === 1 ? open[0] : null);
      if (!person) {
        student.focus();
        return showMessage(message, { errors: ['Choose a student from the suggestions.'] });
      }
      const values = Object.fromEntries(fields.map(f => [f.column, f.value()]));
      const result = await api(url('add'), { ...values, [column]: chosen(), student_id: person.student_id });
      if (result.errors) return showMessage(message, result);
      const m = result.member;
      message.replaceChildren();
      student.value = '';
      picked = null;
      newName.value = '';
      confirmed = false;
      for (const f of fields) f.reset();
      showState(result.state);
      // A new group now shows in the dropdown; keep it chosen.
      choice.value = m.group;
      show();
      suggest();
      student.focus();
    }

    add.addEventListener('click', addMember);
    student.addEventListener('input', () => { picked = null; suggest(); });
    student.addEventListener('focus', suggest);
    student.addEventListener('blur', () => { suggestionBox.hidden = true; });
    student.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (suggestions.length) moveActive(event.key === 'ArrowDown' ? 1 : -1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (active >= 0 && !suggestionBox.hidden) pick(suggestions[active]);
        else if (picked) addMember();
        else if (student.value.trim()) showMessage(message, { errors: ['No student matches that name. Add them above first.'] });
      } else if (event.key === 'Escape') {
        suggestionBox.hidden = true;
      }
    });

    return { show };
  }

  // ---- Counselor ranges ----

  function ruleRow(rule = { from: '', to: '', counselor: '' }) {
    const row = el('tr');
    const cell = input => { const td = el('td'); td.append(input); return td; };
    const letter = (name, value) => Object.assign(el('input', 'letter'), { name, value, maxLength: 1, ariaLabel: name });
    const counselor = Object.assign(el('input'), { name: 'counselor', value: rule.counselor, ariaLabel: 'counselor' });
    const remove = Object.assign(el('button', null, 'Remove'), { type: 'button' });
    remove.addEventListener('click', () => { row.remove(); $('preview-result').replaceChildren(); });
    row.append(cell(letter('from', rule.from)), cell(letter('to', rule.to)), cell(counselor), cell(remove));
    return row;
  }

  const currentRules = () => [...$('rules').rows].map(row => ({
    from: row.querySelector('[name=from]').value,
    to: row.querySelector('[name=to]').value,
    counselor: row.querySelector('[name=counselor]').value,
  }));

  $('add-rule').addEventListener('click', () => $('rules').append(ruleRow()));
  $('rules').addEventListener('input', () => $('preview-result').replaceChildren());

  $('preview').addEventListener('click', async () => {
    const box = $('preview-result');
    const rules = currentRules();
    const result = await api('/api/counselors/preview', { rules });
    if (result.errors) return showMessage(box, result);
    box.replaceChildren();
    if (result.changes.length === 0) return box.append(el('div', 'ok', 'Everyone already has the counselor these ranges give them.'));

    box.append(el('p', null, `${result.changes.length} students would change:`));
    const list = el('ul', 'changes');
    for (const c of result.changes) list.append(el('li', null, `${c.name}: ${c.from || 'no counselor'} → ${c.to}`));
    const apply = Object.assign(el('button', 'primary', `Apply to ${result.changes.length} students`), { type: 'button' });
    apply.addEventListener('click', async () => {
      const done = await api('/api/counselors/apply', { rules });
      if (done.errors) return showMessage(box, done);
      showMessage(box, { text: `Changed ${done.changed} counselors and saved the ranges.` });
      showState(done.state);
    });
    box.append(list, apply);
  });

  // ---- Start ----

  SL.sort.setUp(showStudents);
  $('students-search').addEventListener('input', showStudents);
  $('grade-only').addEventListener('change', showStudents);
  $('then-dir').append(SL.sort.arrowIcon());
  $('then-by').addEventListener('change', event => { thenSort.by = event.target.value; showStudents(); });
  $('then-dir').addEventListener('click', event => {
    const button = event.currentTarget, up = thenSort.ascending = !thenSort.ascending;
    button.classList.toggle('down', !up);
    button.title = up ? 'Ascending' : 'Descending';
    button.setAttribute('aria-label', up ? 'Ascending, click for descending' : 'Descending, click for ascending');
    showStudents();
  });

  // The logo and background picture show only if they're in images/.
  fetch('images/logo.svg', { method: 'HEAD' }).then(res => {
    if (res.ok) { $('logo').src = 'images/logo.svg'; $('logo').hidden = false; }
  }).catch(() => {});
  fetch('images/background.jpg', { method: 'HEAD' }).then(res => {
    if (!res.ok) return;
    document.body.style.backgroundImage = 'url("images/background.jpg")';
    document.body.classList.add('has-background');
  }).catch(() => {});

  api('/api/state').then(state => {
    for (const [file, group] of Object.entries(state.groups)) groupSections[file] = groupSection(file, group);
    setUpTypedBoxes(state.choices);
    linkGradeAndYear(state.classOf, state.choices.grade);
    for (const rule of state.rules) $('rules').append(ruleRow(rule));
    if (state.rules.length === 0) $('rules').append(ruleRow());
    showState(state);
  }).catch(() => showMessage($('add-message'), { errors: ["Something went wrong loading the demo. Try Start over."] }));
})();
