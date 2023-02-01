import { useEffect, useRef } from 'react';

/**
 * How to use:
 * Import and rename useEffect hooks to useEffectDebugger
 * You can also give your dependencies names for the console output
 * as opposed to the indeces
 * See top answer (Brad Ryan)
 * https://stackoverflow.com/questions/55187563/determine-which-dependency-array-variable-caused-useeffect-hook-to-fire
 *
 */
export const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;

      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps).length) {
    // eslint-disable-next-line no-console
    console.log('[use-effect-debugger] ', changedDeps);
  }

  useEffect(effectHook, dependencies);
};

export default useEffectDebugger;
