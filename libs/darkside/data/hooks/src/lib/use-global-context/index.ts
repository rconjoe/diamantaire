import { GlobalContext, GlobalContextInterface } from '@diamantaire/darkside/context/global-context';
import { useContext } from 'react';

// export interface UseGlobal {
//   count: number;
//   increment: () => void;
// }

export function useGlobalContext(): GlobalContextInterface {
  const data: any = useContext(GlobalContext);

  return data;
}

export default useGlobalContext;
