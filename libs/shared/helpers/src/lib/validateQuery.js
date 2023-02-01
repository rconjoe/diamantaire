const validateQuery = (query, validOptions) => {
  if (!query) {
    return;
  }

  const lowerCasedQuery = query.toLowerCase();

  return validOptions.includes(lowerCasedQuery) ? lowerCasedQuery : undefined;
};

export default validateQuery;
