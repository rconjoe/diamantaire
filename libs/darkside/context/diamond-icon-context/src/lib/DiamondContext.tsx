import React, { createContext } from 'react';

import { ReactComponent as AsscherIcon } from '../assets/diamondShapes/asscher.svg';
import { ReactComponent as BaguetteIcon } from '../assets/diamondShapes/baguette.svg';
import { ReactComponent as CushionIcon } from '../assets/diamondShapes/cushion.svg';
import { ReactComponent as EmeraldIcon } from '../assets/diamondShapes/emerald.svg';
import { ReactComponent as MarquiseIcon } from '../assets/diamondShapes/marquise.svg';
import { ReactComponent as OvalIcon } from '../assets/diamondShapes/oval.svg';
import { ReactComponent as PearIcon } from '../assets/diamondShapes/pear.svg';
import { ReactComponent as PrincessIcon } from '../assets/diamondShapes/princess.svg';
import { ReactComponent as RadiantIcon } from '../assets/diamondShapes/radiant.svg';
import { ReactComponent as RoundBrilliantIcon } from '../assets/diamondShapes/round-brilliant.svg';
import { ReactComponent as TrillionIcon } from '../assets/diamondShapes/trillion.svg';
import { ReactComponent as BezelIcon } from '../assets/ringStyles/bezel.svg';
import { ReactComponent as CathedralIcon } from '../assets/ringStyles/cathedral.svg';
import { ReactComponent as HaloIcon } from '../assets/ringStyles/halo.svg';
import { ReactComponent as HiddenHaloIcon } from '../assets/ringStyles/hidden-halo.svg';
import { ReactComponent as SolitaireIcon } from '../assets/ringStyles/solitaire.svg';
import { ReactComponent as ThreeStoneIcon } from '../assets/ringStyles/three-stone.svg';
import { ReactComponent as TwoToneIcon } from '../assets/ringStyles/two-tone.svg';
import { ReactComponent as VintageInspiredIcon } from '../assets/ringStyles/vintage-inspired.svg';

interface DiamondShapesContextInterface {
  diamondShapes: any; // { [key: string]: string };
  diamondShapesWithIcon: any; // { [diamondType: string]: DiamondShapeWithIcon };
  ringStylesWithIcon: any; //object;
  iconsAltText: any; //object;
}

type RingStyleWithIconProps = {
  [key: string]: object;
};

const DiamondShapesContext =
  createContext<DiamondShapesContextInterface | null>(null);

export const DiamondShapesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <DiamondShapesContext.Provider value={{ ...diamondShapesContext }}>
      {children}
    </DiamondShapesContext.Provider>
  );
};

export { DiamondShapesContext };
