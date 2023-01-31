const toNumber = (input) => {
  if (typeof input === 'number') {
    return input;
  }
  if (typeof input !== 'string') {
    return new Error('Input is not a string or number');
  }

  return Number(input.replace(/[A-Za-z]/g, ''));
};

export { toNumber };
