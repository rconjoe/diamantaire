// We should prob delete this

import {
  AsscherIcon,
  BaguetteIcon,
  BezelIcon,
  CathedralIcon,
  CushionIcon,
  ElongatedCushionIcon,
  EmeraldIcon,
  FloralIcon,
  HaloIcon,
  HiddenHaloIcon,
  MarquiseIcon,
  OvalIcon,
  PearIcon,
  PrincessIcon,
  RadiantIcon,
  RoundBrilliantIcon,
  SolitaireIcon,
  ThreeStoneIcon,
  TrillionIcon,
  TwoToneIcon,
  VintageInspiredIcon,
} from '@diamantaire/shared/icons';
import React, { createContext } from 'react';

interface DiamondShapesContextInterface {
  diamondShapes: any; // { [key: string]: string };
  diamondShapesWithIcon: any; // { [diamondType: string]: DiamondShapeWithIcon };
  ringStylesWithIcon: any; //object;
  iconsAltText: any; //object;
}

type RingStyleWithIconProps = {
  [key: string]: object;
};

const DiamondShapesContext = createContext<DiamondShapesContextInterface | null>(null);

export const DiamondShapesProvider = ({ children }: { children: React.ReactNode }) => {
  const diamondShapes = {
    radiant: 'Radiant',
    'round-brilliant': 'Round Brilliant',
    emerald: 'Emerald',
    baguette: 'Baguette',
    asscher: 'Asscher',
    marquise: 'Marquise',
    cushion: 'Cushion',
    'baguette+oval': 'Baguette and Oval',
    'marquise+Trillion': 'Marquise and Trillion',
    'oval+trillion': 'Oval and Trillion',
    oval: 'Oval',
    pear: 'Pear',
    trillion: 'Trillion',
    princess: 'Princess',
    'half-moon': 'Half Moon',
    shield: 'Shield',
    octavia: 'Octavia',
    lozenge: 'Lozenge',
    longHexagon: 'Long Hexagon',
    hexagon: 'Hexagon',
    keystone: 'Keystone',
    'baguette+marquise': 'Baguette and Marquise',
    'baguette+trillion': 'Baguette and Trillion',
    'tapered-baguette': 'Tapered Baguette',
    'emerald+pear': 'Emerald and Pear',
    'round-brilliant+pear': 'Round Brilliant and Pear',
    'round-brilliant+oval': 'Round Brilliant and Oval',
    'round-brilliant+baguette': 'Round Brilliant and Baguette',
    'round-brilliant+emerald': 'Round Brilliant and Emerald',
    'marquise+baguette': 'Marquise and Baguette',
    'marquise+round-brilliant': 'Marquise and Round Brilliant',
  };

  const diamondShapesWithIcon = {
    radiant: {
      title: 'Radiant',
      icon: <RadiantIcon />,
    },
    'round-brilliant': {
      title: 'Round Brilliant',
      icon: <RoundBrilliantIcon />,
    },
    emerald: {
      title: 'Emerald',
      icon: <EmeraldIcon />,
    },
    baguette: {
      title: 'Baguette',
      icon: <BaguetteIcon />,
    },
    asscher: {
      title: 'Asscher',
      icon: <AsscherIcon />,
    },
    marquise: { title: 'Marquise', icon: <MarquiseIcon /> },
    cushion: {
      title: 'Cushion',
      icon: <CushionIcon />,
    },
    'baguette+oval': 'Baguette and Oval',
    'marquise+Trillion': 'Marquise and Trillion',
    'oval+trillion': 'Oval and Trillion',
    oval: {
      title: 'Oval',
      icon: <OvalIcon />,
    },
    pear: {
      title: 'Pear',
      icon: <PearIcon />,
    },
    trillion: {
      title: 'Trillion',
      icon: <TrillionIcon />,
    },
    princess: {
      title: 'Princess',
      icon: <PrincessIcon />,
    },
    'elongated-cushion': {
      title: 'Elongated Cushion',
      icon: <ElongatedCushionIcon />,
    },
    'half-moon': 'Half Moon',
    shield: 'Shield',
    octavia: 'Octavia',
    lozenge: 'Lozenge',
    longHexagon: 'Long Hexagon',
    hexagon: 'Hexagon',
    keystone: 'Keystone',
    'baguette+marquise': 'Baguette and Marquise',
    'baguette+trillion': 'Baguette and Trillion',
    'tapered-baguette': 'Tapered Baguette',
    'emerald+pear': 'Emerald and Pear',
    'round-brilliant+pear': 'Round Brilliant and Pear',
    'round-brilliant+oval': 'Round Brilliant and Oval',
    'round-brilliant+baguette': 'Round Brilliant and Baguette',
    'round-brilliant+emerald': 'Round Brilliant and Emerald',
    'marquise+baguette': 'Marquise and Baguette',
    'marquise+round-brilliant': 'Marquise and Round Brilliant',
  };

  const ringStylesWithIcon: RingStyleWithIconProps = {
    solitaire: {
      title: 'Solitaire',
      icon: <SolitaireIcon />,
    },
    cathedral: {
      title: 'Cathedral',
      icon: <CathedralIcon />,
    },
    bezel: {
      title: 'Bezel',
      icon: <BezelIcon />,
    },
    halo: {
      title: 'Halo',
      icon: <HaloIcon />,
    },
    'hidden-halo': {
      title: 'Hidden Halo',
      icon: <HiddenHaloIcon />,
    },
    'three-stone': {
      title: 'Three Stone',
      icon: <ThreeStoneIcon />,
    },
    'two-tone': {
      title: 'Two Tone',
      icon: <TwoToneIcon />,
    },
    'vintage-inspired': {
      title: 'Vintage Inspired',
      icon: <VintageInspiredIcon />,
    },
    floral: {
      title: 'Floral',
      icon: <FloralIcon />,
    },
  };

  const iconsAltText = {
    close: 'Close',
  };

  const diamondShapesContext: DiamondShapesContextInterface = {
    diamondShapes,
    diamondShapesWithIcon,
    ringStylesWithIcon,
    iconsAltText,
  };

  return <DiamondShapesContext.Provider value={{ ...diamondShapesContext }}>{children}</DiamondShapesContext.Provider>;
};

export { DiamondShapesContext };
