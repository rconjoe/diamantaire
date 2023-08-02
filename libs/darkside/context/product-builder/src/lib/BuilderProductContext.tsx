import { createContext, useReducer } from 'react';

import { Diamond, BuilderProductComponent } from './utils/builderProduct';

const initialBuilderProductState = {
  diamond: null,
  product: null,
  builderState: 'Select Diamond Or Setting',
};

const BuilderProductContext = createContext({
  builderProduct: initialBuilderProductState,
  dispatch: (action: BuilderAction) => {},
});

const builderState = {
  SelectDiamondOrSetting: 'Select Diamond Or Setting',
  SelectDiamond: 'Select Diamond',
  SelectProduct: 'Select Product',
  Complete: 'Complete',
} as const;

interface BuilderProduct {
  product: BuilderProductComponent | null;
  diamond: Diamond | null;
  builderState: (typeof builderState)[keyof typeof builderState];
}

type BuilderAction =
  | { type: 'ADD_DIAMOND'; payload: Diamond }
  | { type: 'REMOVE_DIAMOND' }
  | { type: 'ADD_PRODUCT'; payload: BuilderProductComponent }
  | { type: 'REMOVE_PRODUCT' };

const builderReducer = (state: BuilderProduct, action: BuilderAction): BuilderProduct => {
  switch (action.type) {
    case 'ADD_DIAMOND': {
      const newState = {
        ...state,
        diamond: action.payload,
      };

      return {
        ...newState,
        builderState: getState(newState),
      };
    }
    case 'REMOVE_DIAMOND': {
      const newState = {
        ...state,
        diamond: null,
      };

      return {
        ...newState,
        builderState: getState(newState),
      };
    }
    case 'ADD_PRODUCT': {
      const newState = {
        ...state,
        product: action.payload,
      };

      return {
        ...newState,
        builderState: getState(newState),
      };
    }
    case 'REMOVE_PRODUCT': {
      const newState = {
        ...state,
        diamond: null,
      };

      return {
        ...newState,
        builderState: getState(newState),
      };
    }
    default:
      return state;
  }
};

type BuilderProductContextProviderProps = {
  children: React.ReactNode;
};

const BuilderProductContextProvider = ({ children }: BuilderProductContextProviderProps) => {
  const [state, dispatch] = useReducer(builderReducer, initialBuilderProductState);

  return (
    <BuilderProductContext.Provider value={{ builderProduct: state, dispatch }}>{children}</BuilderProductContext.Provider>
  );
};

const getState = (state) => {
  const { diamond, product } = state;

  if (diamond) {
    if (product) {
      return builderState.Complete;
    } else {
      return builderState.SelectProduct;
    }
  } else if (product) {
    return builderState.SelectDiamond;
  } else {
    return builderState.SelectDiamondOrSetting;
  }
};

export { BuilderProductContext, BuilderProductContextProvider };
