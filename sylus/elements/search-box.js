// The search box at the bottom: suggestions while typing, Enter to search, and the
// "Showing: ..." line explaining how the search was read.
window.SL = window.SL || {};

SL.setUpSearchBox = function (engine) {
  const { $, el } = SL;
  const box = $('q'), suggestions = $('suggestions'), reading = $('reading');

  function run(text) {
    close();
    SL.showError('');
    if (!text.trim()) return showEveryone();

    const result = engine.search(text);
    SL.list.shown = result.ids;
    reading.replaceChildren(el('span', null, 'Showing:'));
    for (const part of result.understood) reading.append(el('span', part.startsWith('Not ') ? 'tag not' : 'tag', part));
    if (result.fixed.length) reading.append(el('span', null, `(read ${result.fixed.join(', ')})`));
    for (const word of result.ignored) {
      const tag = el('span', 'tag ignored', word);
      tag.title = "Didn't recognise this word";
      reading.append(tag);
    }
    if (result.understood.length === 0) reading.append(el('span', null, 'nothing recognised'));
    const clear = el('button', 'link', 'Show everyone');
    clear.type = 'button';
    clear.addEventListener('click', () => { box.value = ''; showEveryone(); box.focus(); });
    reading.append(clear);
    reading.hidden = false;
    SL.list.render();
    // A search that lands on one student opens them on the right.
    if (result.ids.length === 1) SL.list.select(SL.list.everyone.find(p => p.student_id === result.ids[0]));
  }

  function showEveryone() {
    SL.list.shown = null;
    reading.hidden = true;
    SL.list.render();
  }

  // ---- Suggestions (wait 200 ms after the last key) ----

  function show(items) {
    suggestions.replaceChildren();
    for (const s of items) {
      const item = el('li');
      item.setAttribute('role', 'option');
      item.dataset.value = s.value;
      item.append(el('span', null, s.text), el('span', 'kind', s.kind));
      item.addEventListener('mousedown', event => {
        event.preventDefault();  // keep focus in the box
        box.value = s.value;
        run(s.value);
      });
      suggestions.append(item);
    }
    suggestions.hidden = items.length === 0;
    box.setAttribute('aria-expanded', String(!suggestions.hidden));
  }

  function close() {
    suggestions.hidden = true;
    suggestions.replaceChildren();
    box.setAttribute('aria-expanded', 'false');
  }

  let timer;
  box.addEventListener('input', () => {
    clearTimeout(timer);
    if (!box.value.trim()) { close(); return showEveryone(); }
    timer = setTimeout(() => show(engine.suggest(box.value)), 200);
  });

  box.addEventListener('keydown', event => {
    const items = [...suggestions.children];
    if (event.key === 'Escape') return close();
    if (!items.length || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const current = items.findIndex(i => i.getAttribute('aria-selected') === 'true');
    const next = event.key === 'ArrowDown'
      ? (current + 1) % items.length
      : (current <= 0 ? items.length - 1 : current - 1);
    items.forEach((item, i) => item.setAttribute('aria-selected', String(i === next)));
  });

  box.addEventListener('blur', () => setTimeout(close, 100));

  $('search-form').addEventListener('submit', event => {
    event.preventDefault();
    clearTimeout(timer);
    const picked = suggestions.querySelector('[aria-selected="true"]');
    if (picked) box.value = picked.dataset.value;
    run(box.value);
  });
};
