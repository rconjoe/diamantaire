/**
A state machine for a builder product. 
It represents a product that can have a diamond component and a product component, 
with various states and transitions. 
*/

const builderState = {
  SelectDiamondOrSetting: 'Select Diamond Or Setting',
  SelectDiamond: 'Select Diamond',
  SelectProduct: 'Select Product',
  Complete: 'Complete',
} as const;

export interface BuilderComponent {
  type: string;
}

export interface Diamond {
  diamondType: string;
}

export interface BuilderProductComponent {
  diamondType: string;
}

type BuilderStep = {
  state: (typeof builderState)[keyof typeof builderState];
  action: BuilderTransition;
};

const builderTransitions = {
  GoToURL: 'url',
  AddToCart: 'AddToCart',
};

type BuilderTransition = {
  type: string;
};

export interface BuilderProduct {
  product?: BuilderProductComponent;
  diamond?: Diamond;
  isComplete: boolean;
  /* Product */
  addProduct: (component: BuilderProductComponent) => BuilderStep; // or error if invalid?
  removeProduct: () => BuilderStep;
  getProduct: () => BuilderProductComponent | undefined;
  /* Diamond */
  addDiamond: (diamond: Diamond) => BuilderStep; // or error if invalid?
  removeDiamond: () => BuilderStep;
  getDiamond: () => Diamond | undefined;
  /* Cart */
  addToCart: () => void;
  /* Flow */
  getState: () => (typeof builderState)[keyof typeof builderState];
  getNextStep: () => BuilderStep;
  getCurrentStep: () => BuilderStep;
  getPrevStep: () => BuilderStep;
}

export function createBuilderProduct(): BuilderProduct {
  console.log('createBuilderProduct');
  let diamond: Diamond | undefined, product: BuilderProductComponent | undefined;
  let state: (typeof builderState)[keyof typeof builderState] = builderState.SelectDiamondOrSetting;
  let isComplete = false;

  const getState = () => {
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

  const setState = () => {
    const newState = getState();

    if (state === builderState.Complete) {
      isComplete = true;
    } else {
      isComplete = false;
    }
    state = newState;
  };

  return {
    product,
    diamond,
    isComplete,
    addProduct(component) {
      product = component;
      setState();

      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
    removeProduct() {
      product = undefined;
      setState();

      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
    getProduct() {
      return product;
    },
    addDiamond(newDiamond) {
      console.log('add diamond', newDiamond);
      diamond = newDiamond;
      setState();

      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
    removeDiamond() {
      diamond = undefined;
      setState();

      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
    getDiamond() {
      return diamond;
    },
    addToCart() {
      // Add logic to add the product to the cart
    },
    getState,
    getNextStep() {
      // Add logic to determine the next step based on the current state and components
      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
    getCurrentStep() {
      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
    getPrevStep() {
      // Add logic to determine the previous step based on the current state and components
      return {
        state,
        action: {
          type: builderTransitions.GoToURL,
        },
      };
    },
  };
}
