import LoaderStyles from './Loader.style';

type LoaderProps = {
  color?: string;
  extraClass?: string;
};

const Loader = ({ color, extraClass }: LoaderProps) => {
  return (
    <LoaderStyles color={color} className={extraClass}>
      <div />
      <div />
      <div />
    </LoaderStyles>
  );
};

export { Loader };
