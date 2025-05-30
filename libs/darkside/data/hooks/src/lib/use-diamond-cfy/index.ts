import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { ProductIconListDataTypes } from '../products/use-product-icons';

export interface CaratSliderTooltipTypes {
  _modelApiKey: string;
  id: string;
  title: string;
  headingType: string;
  headingAdditionalClass: string;
  copy: string;
  supportedCountries: { code: string; name: string }[];
}

export interface CtoDiamondPromoBlockTypes {
  _modelApiKey: string;
  id: string;
  title: string;
  headingType: string;
  headingAdditionalClass: string;
  copy: string;
  shouldLazyLoad: boolean;
  media: DatoImageType;
  supportedCountries: {
    code: string;
    name: string;
  }[];
  countryCode: string;
  additionalClass: string;
}

interface CtoDiamondTableTypes {
  id: string;
  seo: { title: string; description: string };
  seoResults: { title: string; description: string };
  speakWithExpert: string;
  caratSliderTooltip: CaratSliderTooltipTypes[];
  headerTitle: string;
  headerCopy: string;
  headerSubtext: string;
  selectFromOurMostPopularShapes: string;
  mostPopularShapes: string;
  interestedInARareShape: string;
  bookAnAppointmentWithADiamondExpert: string;
  diamondSelectorTitle: string;
  diamondSelectorSubtitle: string;
  diamondSelectorNote: string;
  carat: string;
  price: string;
  modify: string;
  checkAvailability: string;
  diamondResultTitle: string;
  diamondResultTitleSecond: string;
  diamondResultFoundTitle: string;
  diamondResultFoundTitleMin2: string;
  diamondResultCopy: string;
  diamondResultCopyMin2: string;
  diamondResultMatchTitle: string;
  diamondResultMatchSelectedCta: string;
  diamondResultMatchViewAllCta: string;
  diamondResultMatchSeeMoreInventoryCta: string;
  diamondResultComparisonGridSelect: string;
  diamondResultComparisonGridSeeDetails: string;
  ctoDiamondResultFoundTitle: string;
  ctoDiamondResultCopy: string;
  ctoDiamondResultNote: string;
  ctoDiamondResultFinalSaleNote: string;
  ctoDiamondResultNeedItFaster: string;
  ctoDiamondResultHowItWorks: {
    title: string;
    content: {
      blocks: {
        title?: string;
        media?: any;
      }[];
    };
    additionalClass?: string;
    headingType?: string;
    headingAdditionalClass?: string;
  }[];
  ctoDiamondResultShapeAndWeightTitle: string;
  ctoDiamondResultRoughImageCaption: string;
  ctoDiamondResultPolishingPlanImageCaption: string;
  ctoDiamondResultPolishedDiamondImageCaption: string;
  ctoDiamondResultPolishedByDateCopy: string;
  clarityLearnMoreLink: string;
  cutLearnMoreLink: string;
  colorLearnMoreLink: string;
  diamondsNote: string;
  notesAdditionalInfo: string;
  diamondNotesImages: { url: string; alt: string }[];
  image1Caption: string;
  image2Caption: string;
  image3Caption: string;
  howToAnchorLinkAndCopy: string;
  diamondDetailsCopy: string;
  caratWeightCopy: string;
  caratDetails: string;
  clarityDetails: string;
  clarityDetailsVvsLg: string;
  clarityDetailsVvsSm: string;
  cutDetails: string;
  cutDetailsRoundBrilliant: string;
  colorDetails: string;
  colorNearcolorlessDetails: string;
  pricingLabel: string;
  pricingDetails: string;
  noDiamondsCopy: string;
  nearColorless: string;
  idealHearts: string;
  diamondVariantImageCaption: string;
  selected: string;
  seeDetails: string;
  selectedDiamondId: string;
  vraiDiamondsInfo: string;
  nonStandardShapeAppointmentsBody: string;
  scheduleAnAppointment: string;
  blocks: {
    _modelApiKey: string;
    title: string;
    headingType: string;
    headingAdditionalClass: string;
    additionalClass: string;
    content: {
      blocks: CtoDiamondPromoBlockTypes[];
    };
  }[];
  productIconList: { items: ProductIconListDataTypes[] };
}

interface DiamondShapeDescriptionTypes {
  diamondType: string;
  description: string;
}

interface DiamondCfyDataProps {
  ctoDiamondTable: CtoDiamondTableTypes;
  allDiamondShapeDescriptions: DiamondShapeDescriptionTypes[];
}

export function useDiamondCfyData(locale: string): UseQueryResult<DiamondCfyDataProps, unknown> {
  return useQuery({
    ...queries.diamondCfy.content(locale),
    meta: {
      locale,
    },
    staleTime: 300000, // Set the stale time to 5 minutes
  });
}

export default useDiamondCfyData;
