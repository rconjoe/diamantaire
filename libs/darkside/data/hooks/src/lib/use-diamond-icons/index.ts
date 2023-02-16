import { DiamondShapesContext } from '@diamantaire/darkside/context/diamond-icon-context';
import { useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseDiamondIcons {
  count: number;
  increment: () => void;
}

export function useDiamondIcons(): UseDiamondIcons {
  const data: any = useContext(DiamondShapesContext);

  return data;
}

export default useDiamondIcons;
