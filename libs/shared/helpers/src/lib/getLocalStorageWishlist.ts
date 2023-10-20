export function getLocalStorageWishlist() {
  const localStorageList = localStorage.getItem('diamantaireWishlist')?.split('|') || [];
  const list = localStorageList.filter((item) => item.trim() !== '');

  console.log(`localStorageList`, list);

  return list;
}
