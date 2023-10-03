export function sortRingSize(array) {
  const newArray = array.sort((a, b) => {
    return parseFloat(a.value) - parseFloat(b.value);
  });

  return newArray;
}
