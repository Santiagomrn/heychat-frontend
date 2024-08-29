export default function findAndReplaceById(pages, id, newObject) {
  for (const page of pages) {
    const data = page?.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i] = { ...newObject, id };
        return pages;
      }
    }
  }
  return pages;
}
