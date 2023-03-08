/*
    Helper function to create array out of numbered content

    datoProps = all component props
    arrayOfUniqueAttributes = props with a number. ex: cta1, ctaCopy2, etc.
*/

export function normalizeDatoNumberedContent(datoProps, arrayOfUniqueAttributes: Array<string>) {
  let arrayOfBlocks = [];

  Object.keys({ ...datoProps }).map((prop) => {
    const basePropName = prop.substring(0, prop.length - 1);
    const doesPropMatchAnAttribute = arrayOfUniqueAttributes.includes(basePropName);

    if (doesPropMatchAnAttribute) {
      const basePropNumber = parseFloat(prop.slice(-1));

      return (arrayOfBlocks[basePropNumber] = {
        ...arrayOfBlocks[basePropNumber],
        [basePropName]: datoProps[prop],
      });
    }

    return null;
  });

  arrayOfBlocks = arrayOfBlocks.filter((block) => block !== '');

  return arrayOfBlocks;
}
