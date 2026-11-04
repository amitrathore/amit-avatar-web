const SCORECARD_URL = 'https://awake.vc/data/scorecard.json';
const SCORECARD_TIMEOUT_MS = 3000;
const OVERDUE_DAYS = 45;
// Same visibility rule as awake.vc: visible === true, updated not null, every level an integer 0-5.
function parseUpdated(v) {
  if (typeof v !== 'string') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? d : null;
}
function validScorecard(data) {
  if (!data || data.visible !== true) return null;
  const updated = parseUpdated(data.updated);
  if (!updated) return null;
  if (!Array.isArray(data.stages) || data.stages.length === 0) return null;
  const ok = data.stages.every(s => s && typeof s.stage === 'string' && typeof s.covers === 'string' &&
    Number.isInteger(s.level) && s.level >= 0 && s.level <= 5);
  return ok ? updated : null;
}

(async function loadScorecard() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), SCORECARD_TIMEOUT_MS);
    const res = await fetch(SCORECARD_URL, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return;
    const data = await res.json();
    const updated = validScorecard(data);
    if (!updated) return;

    const rows = document.getElementById('scorecard-rows');
    data.stages.forEach(s => {
      const tr = document.createElement('tr');
      const cells = [s.stage, s.covers, 'L' + s.level];
      cells.forEach((text, i) => {
        const td = document.createElement('td');
        td.textContent = text;
        if (i === 2) td.className = 'level';
        tr.appendChild(td);
      });
      rows.appendChild(tr);
    });
    document.getElementById('scorecard-updated').textContent =
      updated.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    if ((Date.now() - updated.getTime()) / 86400000 > OVERDUE_DAYS) {
      document.getElementById('scorecard-overdue').hidden = false;
    }

    const slot = document.getElementById('scorecard-link-slot');
    const a = document.createElement('a');
    a.href = 'https://awake.vc/#scorecard';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = slot.textContent;
    slot.replaceWith(a);

    const section = document.getElementById('scorecard');
    section.hidden = false;

  } catch (e) {
    // Failed fetch, timeout, CORS error or invalid JSON: leave the scorecard hidden.
  }
})();
