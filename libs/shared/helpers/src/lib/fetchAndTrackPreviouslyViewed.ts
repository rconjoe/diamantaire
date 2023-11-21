// Filters out duplicate products and keeps the 10 most recent ones
type ArrayOfProducts = {
  title: string;
  slug: string;
  dateAdded: number;
}[];

function filterDuplicateProducts(array: ArrayOfProducts) {
  const uniqueMap = new Map();

  // Iterate through the array and update the map with the oldest dateAdded for each unique item
  array.forEach((item) => {
    const existingItem = uniqueMap.get(item.title);

    if (!existingItem || item.dateAdded > existingItem.dateAdded) {
      uniqueMap.set(item.title, item);
    }
  });

  // Convert the map values back to an array
  let uniqueArray = Array.from(uniqueMap.values());

  // If there are more than 10 items, sort by dateAdded and remove the oldest ones
  if (uniqueArray.length > 10) {
    uniqueArray = uniqueArray.sort((a, b) => a.dateAdded - b.dateAdded).slice(0, 10);
  }

  return uniqueArray;
}

export function fetchAndTrackPreviouslyViewed(productTitle: string, variantHandle: string) {
  const previouslyViewed = localStorage.getItem('previouslyViewed');
  const date = new Date();

  if (previouslyViewed) {
    let previouslyViewedArray = JSON.parse(previouslyViewed);

    previouslyViewedArray.push({
      title: productTitle,
      slug: variantHandle,
      dateAdded: date.getTime(),
    });

    previouslyViewedArray = filterDuplicateProducts(previouslyViewedArray);

    localStorage.setItem('previouslyViewed', JSON.stringify(previouslyViewedArray));
  } else {
    localStorage.setItem(
      'previouslyViewed',
      JSON.stringify([
        {
          title: productTitle,
          slug: variantHandle,
          dateAdded: date.getTime(),
        },
      ]),
    );
  }
}
