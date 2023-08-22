export function objectToURLSearchParams(obj: object) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}

export function parseStringToObjectWithNestedValues(initialString: string) {
  return JSON.parse(initialString, (_key, value) => {
    // Check if the value is a string and can be parsed again
    if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);

        return parsedValue;
      } catch (error) {
        // If it's not a valid JSON string, return the original value
        return value;
      }
    }

    return value;
  });
}
