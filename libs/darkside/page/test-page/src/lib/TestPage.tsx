import { getTemplate } from '@diamantaire/darkside/template/standard';
import Link from 'next/link';

export const TestPage = () => {
  return (
    <div>
      <h1>This is TestPage!</h1>
      <Link href={'/'}>go to homepage</Link>
    </div>
  );
};

TestPage.getTemplate = getTemplate;

export default TestPage;
