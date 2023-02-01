function* createCartesianSet(head, ...tail) {
  let remainder = tail.length ? createCartesianSet(...tail) : [[]];

  for (let r of remainder) {
    for (let h of head) {
      yield [h, ...r];
    }
  }
}

export { createCartesianSet };
