function buildSynonymRegex(search) {
  if (!search || !search.trim()) return null;

  const normalizedSearch = cleanText(search);
  const words = normalizedSearch.split(" ").filter(Boolean);
  if (!words.length) return null;

  const groups = words.map(word => {
    const variants = new Set();

    // 1️⃣ include the word itself for partial matching
    variants.add(word);

    // 2️⃣ include synonyms only if search word is >=50% of canonical/synonym length
    for (const [key, vals] of Object.entries(synonyms)) {
      // Check against key
      if (word.length / key.length >= 0.5 && key.includes(word)) {
        variants.add(key);
        vals.forEach(v => variants.add(v));
      }

      // Check against each synonym
      for (const v of vals) {
        if (word.length / v.length >= 0.5 && v.includes(word)) {
          variants.add(key);
          vals.forEach(val => variants.add(val));
        }
      }
    }

    // 3️⃣ escape for regex and combine
    return `(${[...variants].map(escapeRegex).join("|")})`;
  });

  // allow non-alphanumeric chars between words
  const pattern = groups.join("[^a-z0-9]*");

  // skip matches inside HTML tags
  return new RegExp(`(${pattern})(?![^<]*>)`, "gi");
}

const synonyms = {
  delete: ["delete", "erase", "deleting", "erasing"],
  sync: ["sync", "synchronize", "syncing", "synchronizing"],
  backup: ["backup", "backing up", "backed up"],
  restore: ["restore", "restoring"],
  transfer: ["transfer", "transferring", "transferred", "moving", "move"],
  budget: ["budget", "budgeting", "budgets"],
  subcategory: ["sub category" ],
  category: ["categories","category" ],
  excel: ["csv", "spreadsheet"],
  and: ["&amp;"],
  import: ["importing"],
  export: ["exporting"],
};
