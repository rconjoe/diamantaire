const ShowroomNav = `
query showroomNav($locale: SiteLocale) {
  showroomNav(locale: $locale) {
    title
    links {
      ...on ShowroomLinkRecord{
        _modelApiKey
        id
        route
        copy
        country
      }
    }
  }
}
`;

export default ShowroomNav;
