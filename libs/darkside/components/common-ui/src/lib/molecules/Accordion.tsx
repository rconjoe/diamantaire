import { useState, useRef, useEffect } from 'react';

import StyledAccordion from './Accordion.style';

interface AccordionProps {
  activeDefault?: number;
  rows: {
    title: React.ReactNode;
    children: React.ReactNode;
    className: string;
  }[];
}

const Accordion: React.FC<AccordionProps> = ({ rows, activeDefault = null }) => {
  const [activeIndex, setActiveIndex] = useState(activeDefault);
  const accordion = useRef(null);

  const toggleAccordion = (e, index: number) => {
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

      rowElement.style.maxHeight = `calc(${headerElementHeight} + ${contentElementHeight})`;
    }
  };

  return (
    <StyledAccordion className="accordion" ref={accordion}>
      {rows.map((row, index) => {
        const isActive = activeIndex === index;
        const activeClass = isActive ? ' accordion-row-active' : '';

        return (
          <div key={index} className={`accordion-row${activeClass} ${row.className}`}>
            <div className="accordion-header" onClick={(e) => toggleAccordion(e, index)}>
              <div className="text">{row.title}</div>
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
