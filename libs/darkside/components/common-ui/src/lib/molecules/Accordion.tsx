import { useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(activeDefault);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <StyledAccordion className="accordion">
      {rows.map((row, index) => {
        const isActive = activeIndex === index;
        const activeClass = isActive ? ' accordion-row-active' : '';

        return (
          <div key={index} className={`accordion-row${activeClass} ${row.className}`}>
            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
              <div className="text">{row.title}</div>
              <div className="icon">{isActive ? '-' : '+'}</div>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">{row.children}</div>
            </div>
          </div>
        );
      })}
    </StyledAccordion>
  );
};

export default Accordion;
export { Accordion };
