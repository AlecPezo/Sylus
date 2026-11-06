// The sort control: a menu of what to sort by, joined to a direction button whose
// arrow points up for ascending and turns to point down for descending.
window.SL = window.SL || {};

SL.sort = {
  by: 'first_name',
  ascending: true,

  // A compare function for one column alone, so a tie can go on to a second sort.
  column(by, ascending) {
    return (a, b) => {
      const order = String(a[by] ?? '').localeCompare(String(b[by] ?? ''), undefined, { numeric: true, sensitivity: 'base' });
      return ascending ? order : -order;
    };
  },

  // A compare function for sorting students by one column, ties broken by name.
  comparer(by, ascending) {
    const text = (student, column) => String(student[column] ?? '');
    return (a, b) => {
      const order = SL.sort.column(by, true)(a, b)
        || text(a, 'first_name').localeCompare(text(b, 'first_name')) || text(a, 'last_name').localeCompare(text(b, 'last_name'));
      return ascending ? order : -order;
    };
  },

  compare: (a, b) => SL.sort.comparer(SL.sort.by, SL.sort.ascending)(a, b),

  // Fills a menu for showing one grade with the grades these students are in, keeping the
  // grade already chosen if it's still there.
  gradeMenu(select, students) {
    const keep = select.value;
    const grades = [...new Set(students.map(s => s.grade).filter(Boolean))].sort((a, b) => a - b);
    select.replaceChildren(new Option('All Grades', ''), ...grades.map(g => new Option(SL.gradeName(g), g)));
    select.value = grades.includes(keep) ? keep : '';
  },

  // Calls onChange whenever the sort changes. The menu is first name, last name and grade
  // (sylus/index.html and index/page.html).
  setUp(onChange) {
    const menu = SL.$('sort-by'), arrow = SL.$('sort-dir');
    arrow.replaceChildren(SL.sort.arrowIcon());
    menu.addEventListener('change', () => { SL.sort.by = menu.value; onChange(); });
    arrow.addEventListener('click', () => {
      const up = SL.sort.ascending = !SL.sort.ascending;
      arrow.classList.toggle('down', !up);
      arrow.title = up ? 'Ascending' : 'Descending';
      arrow.setAttribute('aria-label', up ? 'Ascending, click for descending' : 'Descending, click for ascending');
      onChange();
    });
  },

  // A thin line arrow pointing up, drawn in the text colour.
  arrowIcon() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M8 13V3M4 7l4-4 4 4');
    svg.append(path);
    return svg;
  },
};
