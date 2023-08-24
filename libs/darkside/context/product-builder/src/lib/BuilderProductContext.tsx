import { DatoImageType } from '@diamantaire/shared/types';
import { createContext, useReducer, Dispatch, useEffect } from 'react';

type BuilderDiamond = {
  lotId: string;
  diamondType: string;
  productType: string;
  price: number;
};

type BuilderProduct = {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  variantId: string;
  configuration: Record<string, string>;
  productTitle?: string;
  price?: number;
  image?: DatoImageType;
};

type BuilderStep = {
  step: number;
};

const builderState = {
  SelectDiamondOrSetting: 'Select Diamond Or Setting',
  SelectDiamond: 'Select Diamond',
  SelectProduct: 'Select Product',
  UpdateStep: 'Update Step',
  Complete: 'Complete',
} as const;

interface BuilderProductState {
  product: BuilderProduct | null;
  diamond: BuilderDiamond | null;
  step: number;
  type: 'setting-to-diamond' | 'diamond-to-setting';
  builderState: (typeof builderState)[keyof typeof builderState];
}

const initialBuilderProductState: BuilderProductState = {
  diamond: null,
  product: null,
  step: 0,
  type: 'setting-to-diamond',
  builderState: builderState.SelectDiamondOrSetting,
};

type BuilderProductContextType = {
  builderProduct: BuilderProductState;
  dispatch: Dispatch<BuilderAction> | null;
  updateURLParam: (param: string, newValue: string) => void;
  updateFlowData: (type: string, value: object, nextStep?: null | number) => void;
  updateStep: (step: number) => void;
};

const BuilderProductContext = createContext<BuilderProductContextType>({
  builderProduct: initialBuilderProductState,
  dispatch: null,
  updateURLParam: () => null,
  updateFlowData: () => null,
  updateStep: () => null,
});

type BuilderAction =
  | { type: 'ADD_DIAMOND'; payload: BuilderDiamond }
  | { type: 'REMOVE_DIAMOND' }
  | { type: 'ADD_PRODUCT'; payload: BuilderProduct }
  | { type: 'REMOVE_PRODUCT' }
  | {
      type: 'UPDATE_STEP';
      payload: BuilderStep;
    };

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
    case 'UPDATE_STEP': {
      const newState = {
        ...state,
        step: action.payload.step,
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

  function updateURLParam(param, newValue) {
    const url = new URL(window.location.href);

    url.searchParams.set(param, newValue);

    return window.history.pushState(null, '', url);
  }

  const updateFlowData = (type, value, nextStep = null) => {
    if (type && value) {
      dispatch({ type, payload: value });
    }

    if (nextStep) {
      updateStep(nextStep);
    }
  };

  function updateStep(step: number) {
    console.log('updating steppp toooo', step);
    dispatch({
      type: 'UPDATE_STEP',
      payload: {
        step,
      },
    });
    updateURLParam('step', step.toString());
  }

  useEffect(() => {
    console.log('state changed', state);
  }, [state]);

  return (
    <BuilderProductContext.Provider value={{ builderProduct: state, dispatch, updateURLParam, updateFlowData, updateStep }}>
      {children}
    </BuilderProductContext.Provider>
  );
};

const getState = (state) => {
  const { diamond, product, step } = state;

  if (diamond) {
    if (product) {
      return builderState.Complete;
    } else {
      return builderState.SelectProduct;
    }
  } else if (product) {
    return builderState.SelectDiamond;
  } else if (step) {
    return builderState.UpdateStep;
  } else {
    return builderState.SelectDiamondOrSetting;
  }
};

export { BuilderProductContext, BuilderProductContextProvider };
