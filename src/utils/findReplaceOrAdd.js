export default function findAndReplaceOrAddById(data, id, newObject) {
  for (let i = 0; i < data?.length; i++) {
    if (data[i].id === id) {
      data[i] = { ...newObject, id };
      return data;
    }
  }
  return [...data, { ...newObject }];
}
