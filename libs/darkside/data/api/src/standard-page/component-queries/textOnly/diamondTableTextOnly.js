const diamondTableTextOnly = `
  query diamondTableTextOnly($locale: SiteLocale){
    diamondTable(locale: $locale){
      id
      sidebarTitle
      sidebar {
        id
        title
        description
      }
      blockquote {
        id
        title
        copy
        ctaCopy
      }
      color
      clarity
      cut
      certificate
      dfCertificateDetail
      thirdPartyCertificateDetail
      origin
      certificateLabel
      specs {
        id
        value
      }
      cutMapAbridged {
        id
        value
      }
      cutInfoMapAbridged {
        id
        value
      }
      colorMapAbridged {
        id
        value
      }
      clarityMapAbridged {
        id
        value
      }
      bottomContent
    }
  }
`;

export default diamondTableTextOnly;
