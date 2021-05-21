import AsyncStorage from "@react-native-async-storage/async-storage";

function getItems() {
  return AsyncStorage.getItem("items").then((response) => {
    if (response) return Promise.resolve(JSON.parse(response));
    else return Promise.resolve([]);
  });
}

async function getItem(id: any) {
  const savedItems = await getItems();
  return savedItems.find((item: any) => item.id === id);
}

async function saveItem(listItem: any, id: any) {
  listItem.id = id ? id : new Date().getTime();
  const savedItems = await getItems();

  if (id) {
    const index = await savedItems.findIndex((item: any) => item.id === id);
    savedItems[index] = listItem;
  } else savedItems.push(listItem);

  return AsyncStorage.setItem("items", JSON.stringify(savedItems));
}

async function deleteItem(id: any) {
  let savedItems = await getItems();
  const index = await savedItems.findIndex((item: any) => item.id === id);
  savedItems.splice(index, 1);
  return AsyncStorage.setItem("items", JSON.stringify(savedItems));
}

module.exports = {
  saveItem,
  getItems,
  getItem,
  deleteItem,
};
