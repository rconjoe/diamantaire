import { createContext, useReducer } from 'react';

import { createBuilderProduct, BuilderProduct, Diamond, BuilderProductComponent } from './utils/builderProduct';

const BuilderProductContext = createContext({
  builderProduct: createBuilderProduct(),
});

type BuilderAction =
  | { type: 'ADD_DIAMOND'; payload: Diamond }
  | { type: 'REMOVE_DIAMOND' }
  | { type: 'ADD_PRODUCT'; payload: BuilderProductComponent }
  | { type: 'REMOVE_PRODUCT' };

const builderReducer = (state: BuilderProduct, action: BuilderAction): BuilderProduct => {
  switch (action.type) {
    case 'ADD_DIAMOND': {
      state.addDiamond(action.payload);

      return {
        ...state,
      };
    }
    case 'REMOVE_DIAMOND': {
      state.removeDiamond();

      return {
        ...state,
      };
    }
    case 'ADD_PRODUCT': {
      state.addProduct(action.payload);

      return {
        ...state,
      };
    }
    case 'REMOVE_PRODUCT': {
      state.removeProduct();

      return {
        ...state,
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
  const [state, dispatch] = useReducer(builderReducer, createBuilderProduct());

  return (
    <BuilderProductContext.Provider value={{ builderProduct: state, dispatch }}>{children}</BuilderProductContext.Provider>
  );
};

export { BuilderProductContext, BuilderProductContextProvider };
