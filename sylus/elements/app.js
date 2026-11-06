// Starts the page from the output file the build wrote (output/data.js).
// Nothing here reads the CSVs or connects to anything.
(function () {
  const data = window.STUDENT_LIFE;
  if (!data) {
    SL.showError('No data yet. Double-click start in the access folder to build it, then reopen this page.');
    return;
  }

  SL.showHeader(data.assets);
  SL.list.everyone = data.people;
  SL.list.fieldLabels = Object.fromEntries(Object.entries(data.studentFields ?? {})
    .map(([column, field]) => [column, field.label === 'Class of' ? 'Expected Graduation' : field.label]));
  SL.sort.setUp(SL.list.render);
  const gradeOnly = SL.$('grade-only');
  SL.sort.gradeMenu(gradeOnly, data.people);
  gradeOnly.addEventListener('change', () => { SL.list.grade = gradeOnly.value; SL.list.render(); });
  for (const box of [SL.$('list'), SL.$('detail')]) SL.showScrollbarWhileScrolling(box);
  SL.setUpSearchBox(SL.createSearch(data));

  const built = new Date(data.built);
  const note = SL.$('built');
  note.textContent = ` · updated ${built.toLocaleDateString()} ${built.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;

  SL.list.render();
})();
