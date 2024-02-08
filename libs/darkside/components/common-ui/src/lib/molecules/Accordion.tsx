import { useEffect, useRef, useState } from 'react';

import StyledAccordion from './Accordion.style';
import { Heading } from './Heading';

interface AccordionProps {
  activeDefault?: number;
  isDiamondDetail?: boolean;
  enableScroll?: boolean;
  rows: {
    title: React.ReactNode;
    children: React.ReactNode;
    className: string;
    withHeading?: boolean;
  }[];
}

const Accordion: React.FC<AccordionProps> = ({ rows, activeDefault = null, isDiamondDetail, enableScroll }) => {
  const [activeIndex, setActiveIndex] = useState(activeDefault);
  const isInitialMount = useRef(true);
  const accordion = useRef(null);

  const toggleAccordion = (index: number) => {
    const newIndex = activeIndex === index ? null : index;

    setActiveIndex(newIndex);

    const rows = `.accordion-row`;
    const elements = accordion.current?.querySelectorAll(rows);

    elements.forEach((v) => v.removeAttribute(`style`));

    if (typeof newIndex === `number`) {
      const header = `.accordion-row .accordion-header`;
      const headerElement = accordion.current?.querySelector(header);
      const headerElementHeight = `${headerElement.clientHeight}px`;
      const content = `.accordion-row:nth-child(${newIndex + 1}) .accordion-content`;
      const contentElement = accordion.current?.querySelector(content);
      const contentElementHeight = `${contentElement.clientHeight}px`;
      const row = `.accordion-row:nth-child(${newIndex + 1})`;
      const rowElement = accordion.current?.querySelector(row);

      rowElement.style.maxHeight = `calc(${headerElementHeight} + ${contentElementHeight} + 5rem)`;
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      return;
    }

    if (enableScroll && activeIndex !== null) {
      const row = accordion.current?.querySelector(`.accordion-row:nth-child(${activeIndex + 1})`);
      const offsetTop = row.getBoundingClientRect().top + window.scrollY - 55;

      if (row) {
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [enableScroll, activeIndex]);

  return (
    <StyledAccordion className="accordion" ref={accordion}>
      {rows.map((row, index) => {
        const isActive = activeIndex === index;
        const activeClass = isActive ? ' accordion-row-active' : '';
        const { withHeading = true } = row;

        return (
          <div key={index} className={`accordion-row${activeClass} ${row.className}`}>
            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
              {isDiamondDetail ? (
                withHeading ? (
                  <Heading type="h2" className="text">
                    {row.title}
                  </Heading>
                ) : (
                  <div className="text">{row.title}</div>
                )
              ) : (
                <div className="text">{row.title}</div>
              )}
              <div className="icon">{isActive ? '-' : '+'}</div>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">
                <div className="accordion-content-wrapper">{row.children}</div>
              </div>
            </div>
          </div>
        );
      })}
    </StyledAccordion>
  );
};

export default Accordion;
export { Accordion };
