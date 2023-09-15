export function extractMetalTypeFromShopifyHandle(string) {
  const metalTypes = ['yellow-gold', 'white-gold', 'rose-gold', 'platinum', 'sterling-silver'];
  const regex = new RegExp(metalTypes.join('|'), 'i');
  const match = string.match(regex);

  if (match) {
    const extracted = match[0];

    console.log(extracted);

    return extracted;
  } else {
    console.log('Metal type not found in the string.');
  }
}
