export function sortRingSize(array) {
  // Sort the array by the 'value' attribute
  const sortedArray = array.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

  // Remove duplicates based on the 'id' attribute
  const uniqueArray = sortedArray.filter((item, index, self) => {
    return index === self.findIndex((t) => t.value === item.value);
  });

  return uniqueArray;
}
