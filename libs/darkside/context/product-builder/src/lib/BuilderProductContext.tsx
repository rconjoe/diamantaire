import { createContext, useReducer, Dispatch, useEffect } from 'react';

type BuilderDiamond = {
  lotId: string;
  diamondType: string;
  productType: string;
};

type BuilderProduct = {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  variantId: string;
  configuration: Record<string, string>;
};

const builderState = {
  SelectDiamondOrSetting: 'Select Diamond Or Setting',
  SelectDiamond: 'Select Diamond',
  SelectProduct: 'Select Product',
  Complete: 'Complete',
} as const;

interface BuilderProductState {
  product: BuilderProduct | null;
  diamond: BuilderDiamond | null;
  builderState: (typeof builderState)[keyof typeof builderState];
}

const initialBuilderProductState: BuilderProductState = {
  diamond: null,
  product: null,
  builderState: builderState.SelectDiamondOrSetting,
};

type BuilderProductContextType = {
  builderProduct: BuilderProductState;
  dispatch: Dispatch<BuilderAction> | null;
};

const BuilderProductContext = createContext<BuilderProductContextType>({
  builderProduct: initialBuilderProductState,
  dispatch: null,
});

type BuilderAction =
  | { type: 'ADD_DIAMOND'; payload: BuilderDiamond }
  | { type: 'REMOVE_DIAMOND' }
  | { type: 'ADD_PRODUCT'; payload: BuilderProduct }
  | { type: 'REMOVE_PRODUCT' };

const builderReducer = (state: BuilderProductState, action: BuilderAction): BuilderProductState => {
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

  useEffect(() => {
    console.log('state chnaaged', state);
  }, [state]);

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
