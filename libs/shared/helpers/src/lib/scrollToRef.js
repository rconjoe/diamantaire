import scrollTo from 'react-scroll-to-component-ssr';

const scrollToRef = ({
  currentRef,

  /**
   * For some reason, this lib aligns element to top as 1px off
   * so we need to make up for this by baking in a 1px extra offset for
   * "flush to top" action
   */
  offset = 1,
  align = 'top',
  ease = 'inOutCube',
  duration = '650',
}) => {
  scrollTo(currentRef, {
    offset,
    align,
    ease,
    duration,
  });
};

export default scrollToRef;
