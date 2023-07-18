export const DIAMOND_TABLE_QUERY = `
query diamondTableQuery($locale: SiteLocale) {
  diamondTable(locale: $locale) {    
    seo {
      seoTitle
      seoDescription
    }
    title
    dynamicTitle
    color(markdown: false)
    clarity(markdown: false)
    cut(markdown: false)
    colorFilterBelowCopy
    clarityFilterBelowCopy
    cutFilterBelowCopy
    carat(markdown: false)
    certificate(markdown: false)
    dfCertificateDetail
    origin
    certificateLabel
    specs {
      key
      value
    }
    cutMapAbridged {
      key
      value
    }
    cutInfoMapAbridged {
      key
      value
    }
    colorMapAbridged {
      key
      value
    }
    clarityMapAbridged {
      key
      value
    }
    sidebarTitle
    sidebar {
      title
      description
    }
    blockquote {
      title
      copy
      image {
        url
      }
    }
    bottomContent
    diamondNotifierCtaCopy
    diamondNotifierCtaLink
    clearFiltersButtonCopy
    diamondAdvisorIntroSubtitleLink
    diamondAdvisorIntroSubtitleText
    diamondAdvisorQuizStep1Title
    diamondAdvisorQuizStep1Subtitle
    diamondAdvisorQuizStep2Title
    diamondAdvisorQuizStep2Subtitle
    diamondAdvisorQuizStep3Title
    diamondAdvisorQuizStep3Subtitle
    diamondAdvisorQuizStep3Option1
    diamondAdvisorQuizStep3Option2
    diamondAdvisorQuizStep3Option3
    diamondAdvisorQuizStep3Option4
    diamondAdvisorQuizStep3Option5
    diamondAdvisorResultTitle
    diamondAdvisorNoResultTitle
    diamondAdvisorPostSubmissionSubtitleText
    diamondAdvisorPostSubmissionSubtitleLink
    diamondAdvisorPostSubmissionSecondaryCtaCopy
    diamondAdvisorPostSubmissionSecondaryCtaRoute
    diamondAdvisorQuizNextButtonCopy
    diamondAdvisorQuizFinalButtonCopy
    diamondAdvisorPostSubmissionConjunction
    diamondAdvisorPostSubmissionHeader
    cannotFindDiamondSentence1(markdown: false)
    cannotFindDiamondSentence2(markdown: false)
  }
}`;
