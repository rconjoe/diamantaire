export function getLocalStorageWishlist() {
  if (typeof window === 'undefined') return [];

  const localStorageList = window.localStorage.getItem('diamantaireWishlist')?.split('|') || [];

  const list = localStorageList.filter((item) => item.trim() !== '');

  return list;
}
