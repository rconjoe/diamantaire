export function sortRingSize(array) {
  console.log('sortRingSize', array);
  const newArray = array.sort((a, b) => {
    return parseFloat(a.value) - parseFloat(b.value);
  });

  console.log('newArray', newArray);

  return newArray;
}
