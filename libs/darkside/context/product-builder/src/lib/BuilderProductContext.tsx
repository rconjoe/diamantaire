import { removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
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
};

type BuilderStep = {
  step: number;
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
  diamond: BuilderDiamond | null;
  step: number;
  type: FlowType;
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
  updateFlowData: (type: string, value: object, nextStep?: null | number) => void;
  updateStep: (step: number) => void;
};

const BuilderProductContext = createContext<BuilderProductContextType>({
  builderProduct: initialBuilderProductState,
  dispatch: null,
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
    }
  | {
      type: 'UPDATE_FLOW_TYPE';
      payload: BuilderFlowType;
    };

const builderReducer = (state: BuilderProductState, action: BuilderAction): BuilderProductState => {
  switch (action.type) {
    case 'ADD_DIAMOND': {
      console.log('add diamond payload', action.payload);
      const newState = {
        ...state,
        diamond: action.payload,
      };

      // If a product and diamond have already been added, check that the new product diamondType matches the existing diamondType
      if (state.type === 'diamond-to-setting' && state.product !== null && state.diamond !== null) {
        if (state.diamond.diamondType !== action.payload.diamondType) {
          newState.product = null;

          removeUrlParameter('productSlug');
          removeUrlParameter('collectionSlug');

          return {
            ...newState,
            builderState: getState(newState),
          };
        }
      }

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

      // Need to revisit
      // If a product and diamond have already been added, check that the new product diamondType matches the existing diamondType
      // if (state.type === 'setting-to-diamond' && state.product !== null && state.diamond !== null) {
      //   console.log('here we go', {
      //     diamondInState: state.diamond.diamondType,
      //     prodDiamondType: action.payload.diamondType,
      //   });

      //   if (state.diamond.diamondType !== action.payload.diamondType) {
      //     newState.diamond = null;
      //     removeUrlParameter('lotId');

      //     return {
      //       ...newState,
      //       builderState: getState(newState),
      //     };
      //   }
      // }

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

const BuilderProductContextProvider = ({ children }: BuilderProductContextProviderProps) => {
  const [state, dispatch] = useReducer(builderReducer, initialBuilderProductState);

  const updateFlowData = (type, value, nextStep = null) => {
    if (type && value) {
      dispatch({ type, payload: value });
    }

    if (nextStep) {
      updateStep(nextStep);
    }
  };

  function updateStep(step: number) {
    dispatch({
      type: 'UPDATE_STEP',
      payload: {
        step,
      },
    });
    updateUrlParameter('step', step.toString());
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
  const { diamond, product } = state;

  if (diamond) {
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
