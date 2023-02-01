export const DATO_MODEL_OPTIONS = [
  {
    value: '',
    copy: 'Select a DATO model',
  },
  {
    value: 'configurations',
    copy: 'Configurations [Modular Jewelry]',
  },
  {
    value: 'configuredProductOptions',
    copy: 'Configured Product Options [Non-Modular Jewelry]',
  },
  {
    value: 'omegaProducts',
    copy: 'Omega Products [Engagement Ring & Wedding Band]',
  },
  {
    value: 'standardPages',
    copy: 'Standard Pages [Special Shapes, Hearst Collection, etc]',
    explicitFields: {
      id: [],
      // all possible unique fields that can exist inside the modular field "content1"
      content1: [
        '_modelApiKey',
        'attribution',
        'byText',
        'copy',
        'copy1',
        'copy2',
        'copy3',
        'copy4',
        'ctaCopy',
        'ctaCopy1',
        'ctaCopy2',
        'ctaCopy3',
        'ctaCopy4',
        'desktopCopy',
        'id',
        'mobileCopy',
        'mobileTitle',
        'quote',
        'subtitle',
        'title',
        'title1',
        'title2',
        'title3',
        'title4',
      ],
      content2: [
        '_modelApiKey',
        'attribution',
        'byText',
        'copy',
        'copy1',
        'copy2',
        'copy3',
        'copy4',
        'ctaCopy',
        'ctaCopy1',
        'ctaCopy2',
        'ctaCopy3',
        'ctaCopy4',
        'desktopCopy',
        'id',
        'mobileCopy',
        'mobileTitle',
        'quote',
        'subtitle',
        'title',
        'title1',
        'title2',
        'title3',
        'title4',
      ],
    },
    // all the fields that has objects as its value and we need to extract the data from those objects
    explicitTransforms: ['content1', 'content2'],
  },
  {
    value: 'listPageHeroBanners',
    copy: 'List Page Hero Banners',
  },
  {
    value: 'productShippingAndReturns',
    copy: 'Product and Shipping Returns',
  },
  {
    value: 'productWaitlists',
    copy: 'Product Waitlist',
  },
  {
    value: 'jewelryOmegaProducts',
    copy: 'Jewelry Omega Products [Tiny Ring, Cuban Link Chain]',
  },
  {
    value: 'jewelryProducts',
    copy: 'Jewelry Products [Stacked Earrings, Iconic Diamond Necklace]',
  },
  {
    value: 'ringSizeOptionCopy',
    copy: 'Ring Size Option Copy  (single entry model)',
  },
  {
    value: 'engravingOptionCopy',
    copy: 'Engraving Option Copy (single entry model)',
  },
  {
    value: 'engagementRingPdpCta',
    copy: 'Engagement Ring PDP CTA (single entry model)',
  },
  {
    value: 'weddingBandProducts',
    copy: 'Wedding Band [Infinity Band, The Round]',
  },
  {
    value: 'engagementRingProducts',
    copy: 'Engagement Ring [Signature Prong, The Three Stone]',
  },
  {
    value: 'diamondShapeSpecs',
    copy: 'Diamond Shape Spec',
  },
  {
    value: 'productTypeFaqs',
    copy: 'Product Type Faq',
  },
  {
    value: 'faqAccordionContents',
    copy: 'FAQ Accordion Content',
  },
  {
    value: 'announcementBarInfos',
    copy: 'Announcement Bar Info',
  },
  {
    value: 'pageSeos',
    copy: 'Page SEO',
  },
  {
    value: 'cookieBanner',
    copy: 'Cookie Banner',
  },
  {
    value: 'blogHeader',
    copy: 'Blog Header',
  },
  {
    value: 'navigationLinks',
    copy: 'Navigation Links',
  },
  {
    value: 'celebrityBlocks',
    copy: 'Celebrity Blocks',
  },
  {
    value: 'quoteBlocks',
    copy: 'Quote Blocks',
  },
  {
    value: 'celebrityJewelries',
    copy: 'Celebrity Jewelry',
  },
  {
    value: 'videoBlocks',
    copy: 'Video Block',
  },
  {
    value: 'trioBlocks',
    copy: 'Trio Blocks',
  },
  {
    value: 'singleMediaBlocks',
    copy: 'Single Media Blocks',
  },
  {
    value: 'creativeBlocks',
    copy: 'Creative Blocks',
  },
  {
    value: 'textOnlyBlocks',
    copy: 'Text Only Blocks',
  },
  {
    value: 'fullWidthBannerBlocks',
    copy: 'Full Width Banner Blocks',
  },
  {
    value: 'halfWidthBannerBlocks',
    copy: 'Half Width Banner Blocks',
  },
  {
    value: 'diamondContentBlocks',
    copy: 'Diamond Content Blocks',
  },
  {
    value: 'jewelryPdpCtas',
    copy: 'Jewelry PDP CTAs',
  },
  {
    value: 'cart',
    copy: 'Cart',
  },
  {
    value: 'humanNamesMappers',
    copy: 'Human Names Mappers',
  },
  {
    value: 'engagementRingSummaryPage',
    copy: 'ER Summary Page',
  },
  {
    value: 'diamondProduct',
    copy: '[PDP] Diamond Product',
  },
  {
    value: 'diamondTable',
    copy: 'Diamond Table',
  },
  {
    value: 'blogPosts',
    copy: 'Blog Post',
  },
  {
    value: 'diamondNotifierPage',
    copy: 'Diamond Notifier Page',
  },
  {
    value: 'headerNavigation',
    copy: 'Header Navigation',
  },
  {
    value: 'footerNavigation',
    copy: 'Footer Navigation',
  },
  {
    value: 'homePage',
    copy: 'Home Page',
  },
  {
    value: 'productIconLists',
    copy: 'Product Icon List',
  },
  {
    value: 'productSpecLabelCollections',
    copy: 'Product Spec Label',
  },
  {
    value: 'productSuggestionQuadBlocks',
    copy: 'Product Suggestion Quad Blocks',
  },
];
