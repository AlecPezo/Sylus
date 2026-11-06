// Finds students by name: full name, first or last name, the start of a name,
// an initial ("maya c") or a small typo.
window.SL = window.SL || {};

// Lowercase, accents removed, punctuation turned into spaces: "José  O'Neil" -> "jose o neil".
SL.normalize = function (text) {
  return String(text ?? '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
};

// Number of single-letter edits between two words, for catching typos. Swapping two
// neighbouring letters ("juinor") counts as one edit.
SL.editDistance = function (a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
};

(function () {
  // How well one typed word matches one name part: exact, the start of it, or a small typo.
  // A single letter counts as an initial only alongside another word ("maya c").
  function wordScore(word, part, withOthers) {
    if (word === part) return 3;
    if ((word.length >= 2 || withOthers) && part.startsWith(word)) return 2;
    if (word.length >= 4 && SL.editDistance(word, part) <= (word.length >= 7 ? 2 : 1)) return 1;
    return 0;
  }

  // The words a student can be found by: first, last and (if the column exists) preferred name.
  function nameParts(student) {
    return [student.first_name, student.last_name, student.preferred_name]
      .flatMap(n => SL.normalize(n).split(' '))
      .filter(Boolean);
  }

  // The students that best match `name`, best tier only, plus how good the match was:
  // 3 exact, 2 start of a name, 1 typo, 0 none. Every typed word must match some part
  // of the student's name, and each part can be used only once.
  SL.matchStudents = function (name, students) {
    const words = SL.normalize(name).split(' ').filter(Boolean);
    if (words.length === 0) return { score: 0, students: [] };

    const scored = [];
    for (const student of students) {
      const parts = nameParts(student);
      const used = new Set();
      let worst = 3;
      for (const word of words) {
        let best = 0, bestIndex = -1;
        parts.forEach((part, i) => {
          if (used.has(i)) return;
          const s = wordScore(word, part, words.length > 1);
          if (s > best) { best = s; bestIndex = i; }
        });
        if (best === 0) { worst = 0; break; }
        used.add(bestIndex);
        worst = Math.min(worst, best);
      }
      if (worst > 0) scored.push({ student, score: worst });
    }

    const top = Math.max(0, ...scored.map(s => s.score));
    return { score: top, students: scored.filter(s => s.score === top).map(s => s.student) };
  };

  SL.findStudents = (name, students) => SL.matchStudents(name, students).students;
})();
