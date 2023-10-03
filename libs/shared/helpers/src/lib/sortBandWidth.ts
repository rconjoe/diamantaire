export function sortBandWidth(options) {
  options.sort((a, b) => {
    // Extract the carat value as a number from the 'value' property
    const caratA = parseFloat(a.value.replace('.mm', ''));
    const caratB = parseFloat(b.value.replace('.mm', ''));

    // If both carat values are 0.01, keep the original order
    if (caratA === 0.01 && caratB === 0.01) {
      return 0;
    }

    // If caratA is 0.01, it should come first
    if (caratA === 0.01) {
      return -1;
    }

    // If caratB is 0.01, it should come first
    if (caratB === 0.01) {
      return 1;
    }

    // Sort by carat value in ascending order if none are 0.01
    return caratA - caratB;
  });

  console.log('new oppppss', options);

  return options;
}
