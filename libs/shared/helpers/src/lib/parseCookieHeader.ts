export function parseCookieHeader(cookieHeader) {
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const parts = cookie.trim().split('=');

    // Check if the cookie part is valid
    if (parts.length < 2) return acc;

    const [name, ...valueParts] = parts;
    const rawValue = valueParts.join('=');

    // Handle empty values
    if (rawValue === '') {
      acc[name] = rawValue;

      return acc;
    }

    // Decode the URL-encoded value
    let decodedValue;

    try {
      decodedValue = decodeURIComponent(rawValue);
    } catch (error) {
      // If decoding fails, use the raw value
      decodedValue = rawValue;
    }

    try {
      // Try to parse the value as JSON
      acc[name] = JSON.parse(decodedValue);
    } catch (error) {
      // If parsing fails, use the decoded value
      acc[name] = decodedValue;
    }

    return acc;
  }, {});
}
