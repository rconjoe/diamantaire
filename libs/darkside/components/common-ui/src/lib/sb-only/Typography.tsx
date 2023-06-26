import { Heading } from '../molecules';

const items = [
  {
    type: 'h1',
    children: 'Heading 1',
    className: 'primary',
  },
  {
    type: 'h2',
    children: 'Heading 2',
    className: 'primary',
  },
  {
    type: 'h3',
    children: 'Heading 3',
    className: 'primary',
  },
  {
    type: 'h4',
    children: 'Heading 4',
    className: 'primary',
  },
];

const Typography = () => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <Heading type={item.type} className={item.className} key={`heading-type-${index}`}>
            {item.children}
          </Heading>
        );
      })}
    </>
  );
};

export default Typography;
