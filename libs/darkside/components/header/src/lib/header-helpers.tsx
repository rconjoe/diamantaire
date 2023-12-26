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

type RingStyleWithIconProps = {
  [key: string]: object;
};

export const diamondShapes = {
  radiant: 'Radiant',
  'round-brilliant': 'Round Brilliant',
  emerald: 'Emerald',
  baguette: 'Baguette',
  asscher: 'Asscher',
  marquise: 'Marquise',
  cushion: 'Cushion',
  'baguette+oval': 'Baguette and Oval',
  'marquise+trillion': 'Marquise and Trillion',
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
  'round-brilliant+round-brilliant': 'Round Brilliant and Round Brilliant',
  'marquise+baguette': 'Marquise and Baguette',
  'marquise+round-brilliant': 'Marquise and Round Brilliant',
};

export const diamondShapesWithIcon = {
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
  'marquise+trillion': 'Marquise and Trillion',
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
  'round-brilliant+round-brilliant': 'Round Brilliant and Round Brilliant',
};

export const ringStylesWithIcon: RingStyleWithIconProps = {
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

export const iconsAltText = {
  close: 'Close',
};
