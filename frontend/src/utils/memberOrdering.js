// Utility to reorder members so leadership appears first
// Priority: Kepala/Ketua first, then Wakil/Deputi, then others
// priority: optional array of keywords in desired order, e.g. ['ketua','wakil']
export function orderMembers(members = [], priority = null) {
  if (!Array.isArray(members) || members.length === 0) return members;

  const defaultPriority = ['kepala', 'ketua', 'wakil', 'deputi'];
  const priorities = Array.isArray(priority) && priority.length > 0 ? priority : defaultPriority;

  // Synonyms and common abbreviations mapping (normalized)
  const synonymMap = {
    kepala: ['kepala', 'kepdin', 'ka dinas', 'ka. dinas', 'ka div', 'ka. div', 'kadiv', 'kabid', 'kepala dinas', 'kepala bidang'],
    ketua: ['ketua', 'presiden', 'presbem'],
    wakil: ['wakil', 'waka', 'wakadin', 'wakadiv', 'wakabid', 'wakil kepala', 'vice'],
    deputi: ['deputi', 'deputy'],
  };

  // Prepare groups keyed by the original priority keys
  const groups = new Map();
  priorities.forEach((p) => groups.set(p, []));
  const others = [];

  const norm = (text) => (text || '').toString().toLowerCase();
  const simplify = (text) =>
    norm(text)
      .normalize('NFKD')
      .replace(/\p{Diacritic}+/gu, '')
      .replace(/[^a-z0-9]+/g, ' ') // keep spaces for word boundaries
      .trim();

  // Build an array of priority groups with patterns
  const priorityGroups = priorities.map((key) => {
    const base = norm(key);
    const patterns = synonymMap[base] ? synonymMap[base] : [base];
    // Ensure the original key is included
    if (!patterns.includes(base)) patterns.unshift(base);
    return { key, patterns: patterns.map(simplify) };
  });

  members.forEach((m) => {
    const label = simplify(`${m.divisi} ${m.jabatan} ${m.nama}`);
    let matched = false;

    for (const group of priorityGroups) {
      // Match if any synonym appears as a full word or obvious substring
      for (const pat of group.patterns) {
        const regex = new RegExp(`(^| )${pat}( |$)`); // word-ish boundary
        if (regex.test(label)) {
          groups.get(group.key).push(m);
          matched = true;
          break;
        }
      }
      if (matched) break;
    }

    if (!matched) others.push(m);
  });

  // sort others alphabetically by divisi then name for stable display
  others.sort((a, b) => {
    const aKey = (norm(a.divisi) + ' ' + norm(a.nama)).trim();
    const bKey = (norm(b.divisi) + ' ' + norm(b.nama)).trim();
    return aKey.localeCompare(bKey);
  });

  // concatenate groups in the order of priorities
  const ordered = [];
  for (const key of priorities) {
    ordered.push(...(groups.get(key) || []));
  }
  ordered.push(...others);

  return ordered;
}