// Small helpers every element uses. Each element file adds itself to window.SL.
window.SL = window.SL || {};

SL.$ = id => document.getElementById(id);

// Builds elements with textContent only, so nothing from the data is ever run as HTML.
SL.el = function (tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// A column or file name as words: "school_id" -> "school ID".
SL.label = name => name.replace(/_/g, ' ').replace(/\bid\b/gi, 'ID');

// Title case for labels and headings: "service hours" -> "Service Hours", "class of" ->
// "Class of". Small joining words stay lowercase unless they come first; ID stays ID.
SL.titleCase = text => String(text).split(' ').map((word, i) =>
  i > 0 && /^(of|and|or|the|a|an|in|on|at|to|for|by)$/i.test(word) ? word.toLowerCase()
    : word === word.toUpperCase() && word.length > 1 ? word
    : word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// Copies text to the clipboard. Returns true if it worked. Falls back to the older
// copy command where the clipboard isn't available (some browsers on pages opened from disk).
SL.copyText = async function (text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const box = document.createElement('textarea');
    box.value = text;
    box.style.position = 'fixed';
    box.style.opacity = '0';
    document.body.append(box);
    box.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* nothing more to try */ }
    box.remove();
    return ok;
  }
};

// A grade for showing: "Grade 10", or the name of the incoming class (grade 8 in the data).
SL.gradeName = grade => (String(grade) === '8' ? 'Incoming Freshman' : `Grade ${grade}`);

SL.showError = function (message) {
  SL.$('error').replaceChildren(message ? SL.el('div', 'error', message) : '');
};

// Shows a box's scrollbar only while it's being scrolled: adds .scrolling, then takes it
// away a moment after the scrolling stops.
SL.showScrollbarWhileScrolling = function (box) {
  let timer;
  box.addEventListener('scroll', () => {
    box.classList.add('scrolling');
    clearTimeout(timer);
    timer = setTimeout(() => box.classList.remove('scrolling'), 900);
  }, { passive: true });
};
