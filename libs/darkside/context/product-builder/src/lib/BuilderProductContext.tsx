import { DatoImageType } from '@diamantaire/shared/types';
import { Dispatch, createContext, useEffect, useReducer } from 'react';

type BuilderDiamond = {
  lotId: string;
  diamondType: string;
  productType: string;
  price: number;
  clarity: string;
  carat: string;
  cut: string;
  color: string;
  dangerousInternalShopifyVariantId: string;
  productTitle: string;
};

type BuilderProduct = {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  variantId: string;
  diamondType: string;
  configuration: Record<string, string>;
  productTitle?: string;
  price?: number;
  image?: DatoImageType;
  goldPurity: string;
  bandAccent: string;
  metal: string;
  shopifyProductHandle: string;
  configuredProductOptionsInOrder: string;
  allDiamondTypes: string[];
};

type StepType = 'select-setting' | 'customize-setting' | 'select-diamond' | 'review-build';

type BuilderStep = {
  step: StepType;
};

type FlowType = 'setting-to-diamond' | 'diamond-to-setting';

type BuilderFlowType = {
  flowType: FlowType;
};

const builderState = {
  SelectDiamondOrSetting: 'Select Diamond Or Setting',
  SelectDiamond: 'Select Diamond',
  SelectProductSetting: 'Select Product Setting',
  CustomizeProductSetting: 'Customize Product Setting',
  UpdateStep: 'Update Step',
  Complete: 'Complete',
} as const;

interface BuilderProductState {
  product: BuilderProduct | null;
  diamonds: BuilderDiamond[] | null;
  step: 'select-setting' | 'customize-setting' | 'select-diamond' | 'review-build';
  type: FlowType;
  builderState: (typeof builderState)[keyof typeof builderState];
}

const initialBuilderProductState: BuilderProductState = {
  diamonds: null,
  product: null,
  step: 'select-diamond',
  type: 'setting-to-diamond',
  builderState: builderState.SelectDiamondOrSetting,
};

type BuilderProductContextType = {
  builderProduct: BuilderProductState;
  dispatch: Dispatch<BuilderAction> | null;
  updateFlowData: (type: string, value: object, nextStep?: null | number) => void;
  updateStep: (step: StepType) => void;
};

const BuilderProductContext = createContext<BuilderProductContextType>({
  builderProduct: initialBuilderProductState,
  dispatch: null,
  updateFlowData: () => null,
  updateStep: () => null,
});

type BuilderAction =
  | { type: 'ADD_DIAMOND'; payload: BuilderDiamond[] }
  | { type: 'REMOVE_DIAMOND' }
  | { type: 'ADD_PRODUCT'; payload: BuilderProduct }
  | { type: 'REMOVE_PRODUCT' }
  | {
      type: 'UPDATE_STEP';
      payload: BuilderStep;
    }
  | {
      type: 'UPDATE_FLOW_TYPE';
      payload: BuilderFlowType;
    };

const builderReducer = (state: BuilderProductState, action: BuilderAction): BuilderProductState => {
  switch (action.type) {
    case 'ADD_DIAMOND': {
      const newState = {
        ...state,
        diamonds: action.payload,
      };

      return {
        ...newState,
        builderState: getState(newState),
      };
    }
    case 'REMOVE_DIAMOND': {
      const newState = {
        ...state,
        diamonds: null,
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
        diamonds: null,
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
    case 'UPDATE_FLOW_TYPE': {
      const newState = {
        ...state,
        type: action.payload.flowType,
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

type UpdateFlowType = (type: string, value: object, nextStep?: null | number) => void;

const BuilderProductContextProvider = ({ children }: BuilderProductContextProviderProps) => {
  const [state, dispatch] = useReducer(builderReducer, initialBuilderProductState);

  const updateFlowData = (type, value, nextStep = null): UpdateFlowType => {
    if (type && value) {
      dispatch({ type, payload: value });
    }

    if (nextStep) {
      updateStep(nextStep);
    }

    return null;
  };

  function updateStep(step: 'select-setting' | 'customize-setting' | 'select-diamond' | 'review-build') {
    dispatch({
      type: 'UPDATE_STEP',
      payload: {
        step,
      },
    });
  }

  useEffect(() => {
    // console.log('state changed', state);
  }, [state]);

  return (
    <BuilderProductContext.Provider value={{ builderProduct: state, dispatch, updateFlowData, updateStep }}>
      {children}
    </BuilderProductContext.Provider>
  );
};

const getState = (state) => {
  const { diamonds, product } = state;

  if (diamonds) {
    if (product) {
      return builderState.Complete;
    } else {
      return builderState.SelectProductSetting;
    }
  } else if (product) {
    return builderState.SelectDiamond;
  } else {
    return builderState.SelectDiamondOrSetting;
  }
};

export { BuilderProductContext, BuilderProductContextProvider };
