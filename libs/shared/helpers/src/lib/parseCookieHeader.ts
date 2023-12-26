export function parseCookieHeader(cookieHeader) {
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, rawValue] = cookie.trim().split('=');

    // Decode the URL-encoded value
    const decodedValue = decodeURIComponent(rawValue);

    try {
      // Try to parse the value as JSON if it's in JSON format
      acc[name] = JSON.parse(decodedValue);
    } catch (error) {
      // If parsing fails, use the original value
      acc[name] = decodedValue;
    }

    return acc;
  }, {});
}
