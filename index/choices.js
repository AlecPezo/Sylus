// Rules the Add a Student form and the server share. First, understanding what's typed in
// the Grade, Gender and Shirt size boxes: "m" is Male,
// "extra large" is XL, "junior" is 11. The page uses it for suggestions and the server
// uses it to check what was sent, so both understand the same words.
//
// A box's choices look like [{ value: 'XL', words: ['extra large', 'x large', ...] }].
(function (exports) {
  // Lowercase with punctuation as spaces: "X-Large" -> "x large".
  const tidy = text => String(text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const squash = text => tidy(text).replace(/ /g, '');

  // Single-letter edits between two words, for catching typos like "meduim".
  function editDistance(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }

  const allWords = choice => [choice.value, ...choice.words];

  // The value typed text means: an exact value or word (spaces and dashes don't matter),
  // else a small typo of a longer word. '' if it means nothing.
  exports.understand = function (text, choices) {
    const typed = squash(text);
    if (!typed) return '';
    const exact = choices.find(c => allWords(c).some(w => squash(w) === typed));
    if (exact) return exact.value;
    if (typed.length < 4) return '';
    const close = choices.filter(c => allWords(c).some(w => squash(w).length >= 4 && editDistance(typed, squash(w)) <= 1));
    return close.length === 1 ? close[0].value : '';
  };

  // Suggestions for partly typed text, best first: what it already means, then choices with
  // a value or word starting with it. Nothing typed shows every choice.
  exports.suggest = function (text, choices) {
    const typed = squash(text);
    if (!typed) return choices;
    const meant = exports.understand(text, choices);
    const starts = choices.filter(c => c.value !== meant && allWords(c).some(w => squash(w).startsWith(typed)));
    return [...choices.filter(c => c.value === meant), ...starts];
  };

  // A person's name with proper capitals: "maya o'brien-reed" -> "Maya O'Brien-Reed",
  // "MCDONALD" -> "McDonald", "iii" -> "III". A name already written with a capital inside
  // it ("DeShawn") is left as typed.
  exports.properName = function (text) {
    return String(text ?? '').split(' ').map(word => {
      if (/^\p{Lu}.*\p{Ll}.*\p{Lu}/u.test(word)) return word;
      const lower = word.toLowerCase();
      if (/^(ii|iii|iv)[.,]?$/.test(lower)) return lower.toUpperCase();
      return lower.replace(/(^|[-'’])(\p{L})/gu, (all, before, letter) => before + letter.toUpperCase())
        .replace(/^Mc(\p{Ll})/u, (all, letter) => `Mc${letter.toUpperCase()}`);
    }).join(' ');
  };

  // A title with proper capitals: "club of the arts" -> "Club of the Arts". Words with a capital
  // in them are left alone, so "FBLA" and "Ms." stay as typed.
  exports.titleText = function (text) {
    return String(text ?? '').split(' ').map((word, i) => {
      if (word !== word.toLowerCase()) return word;
      if (i > 0 && /^(of|and|or|the|a|an|in|on|at|to|for|by)$/.test(word)) return word;
      return word.replace(/(^|-)(\p{L})/gu, (all, before, letter) => before + letter.toUpperCase());
    }).join(' ');
  };

  // A sentence: just its first letter capitalized.
  exports.sentenceText = text => String(text ?? '').charAt(0).toUpperCase() + String(text ?? '').slice(1);

  // "Ortega, Maya" as { last_name, first_name }. The last comma splits them, so
  // "Quinn, Jr., Rosa" keeps the Jr. with the last name. Blank parts if there's no comma.
  exports.splitName = function (text) {
    const name = String(text ?? '').trim().replace(/\s+/g, ' ');
    const at = name.lastIndexOf(',');
    if (at < 0) return { last_name: '', first_name: '' };
    return { last_name: name.slice(0, at).trim(), first_name: name.slice(at + 1).trim() };
  };

  // The school email: full name, then the last two digits of the graduation year.
  // For now; the real format comes later. "Maya Ortega", 2030 -> mayaortega30@pacificachristian.org
  exports.schoolEmail = function ({ first_name, last_name, graduation_year }) {
    const name = `${first_name}${last_name}`.normalize('NFD').toLowerCase().replace(/[^a-z]/g, '');
    return `${name}${String(graduation_year).slice(-2)}@pacificachristian.org`;
  };

  // The counselor for a last name from rules like { from: 'A', to: 'H', counselor: 'Ms. Hale' }.
  exports.counselorFor = function (lastName, rules) {
    const letter = String(lastName ?? '').trim().charAt(0).toUpperCase();
    return rules.find(r => letter >= r.from && letter <= r.to)?.counselor ?? '';
  };
})(typeof module === 'object' && module.exports ? module.exports : ((window.SL = window.SL || {}).choices = {}));
