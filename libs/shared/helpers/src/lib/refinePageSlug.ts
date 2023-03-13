// This is for nested routes within Dato, like the showroom pages

export function refinePageSlug(initialArray) {
  let refinedPageSlug = '';

  initialArray.map((slug: string, index: number) => {
    if (initialArray.length - 1 === index) {
      return (refinedPageSlug += slug);
    } else {
      return (refinedPageSlug += slug + '/');
    }
  });

  return refinedPageSlug;
}
