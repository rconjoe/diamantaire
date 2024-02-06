import { fetchDatoVariant } from '@diamantaire/darkside/data/api';
import { ProductVariantPDPData } from '@diamantaire/server/products';
import { useRouter } from 'next/router';
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
  slug?: string;
};

interface BuilderProduct extends ProductVariantPDPData {
  productContent: {
    assetStack: any[];
  };
  image: any;
  variantDetails: {
    [key: string]: string;
  }[];
}

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
  tempSettingSlugs?: {
    collectionSlug: string;
    productSlug: string;
  };
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
    }
  | { type: 'UPDATE_TEMP_SETTING_SLUGS'; payload: any };

const builderReducer = (state: BuilderProductState, action: BuilderAction): BuilderProductState => {
  switch (action.type) {
    case 'ADD_DIAMOND': {
      console.log('ADDING DIAMOND', action, state.product);

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
    case 'UPDATE_TEMP_SETTING_SLUGS': {
      const newState = {
        ...state,
        tempSettingSlugs: {
          ...state.tempSettingSlugs,
          // Should be an object of collectionSlug and productSlug
          ...action.payload,
        },
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

  const router = useRouter();

  // Maintain Diamond State
  useEffect(() => {
    // if there is a lotID in the query, we need to fetch the diamond data
    async function getDiamond() {
      const qParams = new URLSearchParams({
        lotIds: router.query.lotId?.toString()?.split(',').toString(),
      });

      const diamondResponse = await fetch(`/api/diamonds/getDiamondByLotId?${qParams}`, {})
        .then((res) => res.json())
        .then((res) => res);

      console.log('diamondResponse', diamondResponse);

      updateFlowData('ADD_DIAMOND', diamondResponse);
    }

    if (router.query.lotId) {
      getDiamond();
    }
  }, [router.query.lotId]);

  useEffect(() => {
    async function getSettingProduct() {
      const qParams = new URLSearchParams({
        slug: router?.query?.collectionSlug?.toString(),
        id: router?.query?.productSlug?.toString(),
      }).toString();

      // Product Data
      const productResponse = await fetch(`/api/pdp/getPdpProduct?${qParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(async (res) => {
          const handle = res?.productContent?.shopifyProductHandle || res?.productContent?.configuredProductOptionsInOrder;
          const category = res?.productType;

          const variant: any = handle && (await fetchDatoVariant(handle, category, router.locale));

          return {
            ...res,
            variantDetails: variant?.omegaProduct,
          };
        })
        .catch((e) => {
          console.log('getPdpProduct error', e);
        });

      updateFlowData('ADD_PRODUCT', productResponse);

      return productResponse;
    }

    if (router.query.collectionSlug && router.query.productSlug) {
      getSettingProduct();
    }
  }, [router.query.collectionSlug, router.query.productSlug]);

  useEffect(() => {
    console.log('state changed', state);
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
