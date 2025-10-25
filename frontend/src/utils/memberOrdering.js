// Utility to reorder members so leadership appears first
// Priority: Kepala (or Ketua) first, then Deputi/Wakil, then others
export function orderMembers(members = [], priority = null) {
  // priority: optional array of keyword strings in desired order, e.g. ['kepala','ketua']
  if (!Array.isArray(members) || members.length === 0) return members;

  const defaultPriority = ['kepala', 'ketua', 'deputi', 'wakil'];
  const priorities = Array.isArray(priority) && priority.length > 0 ? priority : defaultPriority;

  const groups = new Map();
  // initialize groups for each priority keyword
  priorities.forEach((p) => groups.set(p, []));
  const others = [];

  const norm = (text) => (text || '').toString().toLowerCase();

  members.forEach((m) => {
    const label = `${norm(m.divisi)} ${norm(m.jabatan)} ${norm(m.nama)}`;
    let matched = false;

    for (const key of priorities) {
      const re = new RegExp(`\\b${key}\\b`, 'i');
      if (re.test(label)) {
        groups.get(key).push(m);
        matched = true;
        break;
      }
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
