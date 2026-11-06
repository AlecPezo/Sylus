// Reads the CSV files in data/. Every CSV needs a student_id column;
// students.csv holds one row per student.

const fs = require('node:fs');
const path = require('node:path');

// Parses CSV text into objects keyed by the header row. Handles quoted fields,
// commas and newlines inside quotes, and "" as an escaped quote.
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(v => v !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some(v => v !== '')) rows.push(row);

  const [header = [], ...body] = rows;
  const columns = header.map(h => h.trim());
  return {
    columns,
    rows: body.map(r => Object.fromEntries(columns.map((col, j) => [col, (r[j] ?? '').trim()]))),
  };
}

// The year a student in `grade` graduates. The school year turns over in July,
// so in November 2026 a senior is the class of 2027.
function graduationYear(grade, today = new Date()) {
  const lastYear = today.getMonth() >= 6 ? today.getFullYear() + 1 : today.getFullYear();
  return String(lastYear + (12 - Number(grade)));
}

// Every CSV in the folder, keyed by file name without ".csv". Incoming freshmen have a file of
// their own but are students like any other, so they join `students` here, as grade 8 (the
// grade before freshman), and aren't a group file.
function loadFiles(dir) {
  const files = {};
  for (const name of fs.readdirSync(dir)) {
    if (!name.toLowerCase().endsWith('.csv')) continue;
    const text = fs.readFileSync(path.join(dir, name), 'utf8').replace(/^﻿/, '');
    files[name.slice(0, -4)] = parseCsv(text);
  }
  const incoming = files.incoming_freshmen;
  if (incoming && files.students) {
    delete files.incoming_freshmen;
    const rows = incoming.rows.map(r => ({ ...r, grade: '8', graduation_year: graduationYear('8') }));
    files.students = { columns: files.students.columns, rows: [...rows, ...files.students.rows] };
  }
  // Emails always show in lower case, however they were typed into a CSV.
  for (const row of files.students?.rows ?? []) if (row.email) row.email = row.email.toLowerCase();
  return files;
}

module.exports = { parseCsv, loadFiles, graduationYear };
