import { getOptionValueSorterByType, sortOptionTypes } from './helpers';
import { configurationOptionValues, optionTypeOrder } from '../constants';
import { VraiProduct } from '../types';

interface ProductData {
  shopifyVariantId: string;
  productSlug: string;
  contentId: string;
}

export interface ProductNode {
  path: string[];
  typePath: string[];
  configurationType?: string; // non root node
  configurationValue?: string; // non root node
  collectionSlug?: string; // root node only
  product?: ProductData; // leaf node only
  children: Record<string, ProductNode>;
}

type OptionType = keyof typeof configurationOptionValues;
type OptionTypeValue = (typeof configurationOptionValues)[keyof typeof configurationOptionValues][number];

type OptionConfig = Record<string, ProductData>;
type OptionConfigs = Record<string, OptionConfig>;

const optionFallbacks = {
  caratWeight: 'other',
};

const excludeOptions = ['goldPurity'];
// exclude : 'goldPurity'

export function generateProductTree(
  collectionProducts: VraiProduct[],
  allConfigurationOptions: Record<OptionType, OptionTypeValue[]>,
  options: { excludeOptions?: string[]; excludeSingleValueOptions?: boolean } = {},
) {
  const collectionSlug = collectionProducts[0].collectionSlug;
  const { excludeSingleValueOptions } = options;

  const treeRoot: ProductNode = {
    path: [],
    typePath: [],
    collectionSlug,
    children: {},
  };

  for (const product of collectionProducts) {
    const { configuration } = product;
    let currentNode: ProductNode = treeRoot;

    Object.entries(allConfigurationOptions)
      .filter(([k]) => !excludeOptions.includes(k))
      .sort(([a1], [b1]) => sortOptionTypes(a1 as any, b1 as any))
      .forEach(([k, allValues]) => {
        // console.log(`iterating through configs of type: ${k} [possible values: ${allValues.join(', ')}]`);

        if (excludeSingleValueOptions && allValues.length === 1) {
          console.log(`skipping config type: ${k} since it only has one possible value`);

          return undefined;
        }

        // if (!configuration[k]) {
        //   console.log(`config type: ${k} since is not set`);
        // } else {
        //   if (k === 'caratWeight') console.log(`config type: ${k} has value: ${configuration[k]}`);
        // }

        const optionValue = configuration[k] || optionFallbacks[k];

        // if (k === 'caratWeight') console.log(configuration, optionValue, optionFallbacks[k]);
        const existingNode = currentNode.children[optionValue];

        // console.log('existing node?', existingNode, k, optionValue);
        if (existingNode) {
          // console.log('found existing node, moving on', k, optionValue);
          currentNode = existingNode;
        } else {
          // console.log('creating new node', k, optionValue);
          const newNode: ProductNode = {
            path: currentNode.path.concat([optionValue]),
            typePath: currentNode.typePath.concat([k]),
            children: {},
            configurationType: k,
            configurationValue: optionValue,
          };

          currentNode.children[optionValue] = newNode;
          currentNode = newNode;
        }
      });

    currentNode.product = {
      productSlug: product.productSlug,
      shopifyVariantId: product['shopifyVariantId'],
      contentId: product['contentId'],
    };
  }

  return treeRoot;
}

function getNode(startNode: ProductNode, path: string[]) {
  let cNode = startNode;

  for (const segment of path) {
    if (!cNode?.children?.[segment]) {
      console.log('No node matches this path', path);

      return undefined;
    }
    cNode = cNode.children[segment];
  }

  return cNode;
}

export function getLeaves(node: ProductNode, leaves: ProductNode[] = []) {
  if (node.children && Object.keys(node.children).length > 0) {
    Object.keys(node.children).forEach((k) => {
      return getLeaves(node.children[k], leaves);
    });
  } else {
    leaves.push(node);
  }

  return leaves;
}

function getParent(rootNode: ProductNode, node: ProductNode) {
  if (!isRootNode(rootNode)) {
    console.log('start node provided must be a root node');

    return undefined;
  }
  const parentPath = getParentPath(node);

  return getNode(rootNode, parentPath);
}

export function getSiblings(rootNode: ProductNode, node: ProductNode) {
  if (!isRootNode(rootNode)) {
    console.log('start node provided must be a root node');

    return undefined;
  }
  const parent = getParent(rootNode, node);

  return parent?.children;
}

function replacePathSegment(path: string[], typePath: string[], [newType, newValue]: [string, string]) {
  const typeIndex = typePath.indexOf(newType);

  if (typeIndex < 0) {
    console.log('Could not find type in typePath');

    return undefined;
  }
  const newPath = [...path];

  newPath[typeIndex] = newValue;

  return newPath;
}

function getMatchingLeavesByConfigType(rootNode: ProductNode, leafNode: ProductNode, matchType: string) {
  if (!isRootNode(rootNode) || !isLeafNode(leafNode)) {
    console.log('start node must be a root node and match node a leaf node');

    return undefined;
  }
  const typeIndex = leafNode.typePath.indexOf(matchType);

  if (typeIndex < 0) {
    console.log('Could not find match type');
  }
  const startPath = leafNode.path.slice(0, typeIndex);
  const endPath = leafNode.path.slice(typeIndex + 1);
  const startNode = getNode(rootNode, startPath);

  return Object.values(startNode?.children || []).map((n) => getNode(n, endPath));
}

function getConfigOptionByType(rootNode: ProductNode, leafNode: ProductNode, matchType: string) {
  if (!isRootNode(rootNode) || !isLeafNode(leafNode)) {
    console.log('start node must be a root node and match node a leaf node');

    return undefined;
  }
  const matchArray = getMatchingLeavesByConfigType(rootNode, leafNode, matchType);

  if (matchArray) {
    const matchIndex = leafNode.typePath.indexOf(matchType);

    return matchArray.reduce(
      (acc: OptionConfigs, match) => {
        const matchValue = match?.path[matchIndex];

        if (matchValue && match.product) {
          acc[matchType][matchValue] = { ...match.product };
        } else {
          console.log('invalid match value or match product', matchValue, match?.product);
        }

        return acc;
      },
      { [matchType]: {} },
    );
  }

  return undefined;
}

function getAllOptionSets(currentNode: ProductNode, options: Record<string, Set<string>> = {}) {
  const addOption = (type: string | undefined, value: string | undefined) => {
    if (!type || !value) {
      return undefined;
    }
    if (!options[type]) {
      options[type] = new Set([value]);
    } else {
      options[type].add(value);
    }
  };

  if (!isLeafNode(currentNode)) {
    if (!isRootNode(currentNode)) {
      addOption(currentNode.configurationType, currentNode.configurationValue);
    }
    Object.values(currentNode.children).forEach((n) => getAllOptionSets(n, options));
  } else {
    addOption(currentNode.configurationType, currentNode.configurationValue);
  }

  return options;
}

export function getAllOptionConfigsForLeaf(rootNode: ProductNode, leafNode: ProductNode) {
  const allOptionTypes = Object.keys(getAllOptionSets(rootNode));

  return allOptionTypes.reduce((acc: OptionConfigs, optionType) => {
    const configByType = getConfigOptionByType(rootNode, leafNode, optionType);

    if (configByType) acc[optionType] = configByType[optionType];

    return acc;
  }, {});
}

export function convertObjTreeToArray(treeObjRoot: ProductNode) {
  const setChildren = (currentNode: ProductNode) => {
    const children = [];

    if (Object.values(currentNode.children).length > 0) {
      Object.values(currentNode.children).forEach((childNode) => {
        children.push({
          name: childNode.configurationValue,
          children: setChildren(childNode),
        });
      });
    }

    return children;
  };
  const tree = {
    name: treeObjRoot.collectionSlug,
    children: setChildren(treeObjRoot),
  };

  return tree;
}

export function getBestMatchedLeaf(node: ProductNode, path: string[]) {
  let currentNode = node;

  if (isLeafNode(node)) {
    return node;
  }
  for (const segment of path) {
    if (isLeafNode(currentNode)) {
      return currentNode;
    }
    const nextNode = currentNode.children[segment];

    if (nextNode) {
      currentNode = nextNode;
    } else {
      const nextType = currentNode.typePath[0];
      const typeValSortFn = getOptionValueSorterByType(nextType);
      const nextPathSegment = Object.keys(currentNode.children).sort(typeValSortFn);

      currentNode = currentNode.children[nextPathSegment[0]];
    }
  }

  return currentNode;
}

export function createProductNodePath(product: VraiProduct) {
  return Object.entries(product.configuration)
    .filter(([type]) => optionTypeOrder.includes(type as any))
    .sort(([typeA], [typeB]) => sortOptionTypes(typeA as any, typeB as any))
    .map(([, value]) => value);
}

export function getProductConfigMatrix(product: VraiProduct, rootNode: ProductNode) {
  const path = createProductNodePath(product);
  const leafNode = getNode(rootNode, path);

  return getAllOptionConfigsForLeaf(rootNode, leafNode);
}

export function addMissingDiamondTypesToConfigs(productConfigs, product, collectionTree, allDiamondTypes: string[]) {
  const productPath = createProductNodePath(product);
  const productNode = getNode(collectionTree, productPath);

  if (!productNode) {
    return undefined;
  }

  const missingDiamondTypes = allDiamondTypes.filter((dt) => !Object.keys(productConfigs.diamondType).includes(dt));

  missingDiamondTypes.forEach((missingDiamondType) => {
    const newPath = replacePathSegment(productPath, productNode.typePath, ['diamondType', missingDiamondType]);
    const newNode = getBestMatchedLeaf(collectionTree, newPath);

    productConfigs.diamondType[missingDiamondType] = { ...newNode.product };
  });
}

function isRootNode(node: ProductNode) {
  return node.path.length === 0;
}

function isLeafNode(node: ProductNode) {
  return Object.keys(node.children).length === 0;
}

function getParentPath(node: ProductNode) {
  return [...node.path].splice(-1);
}
