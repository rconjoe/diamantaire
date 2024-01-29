// Mega Menu + Mobile Menu

export type NavItemsProps = {
  navItems?: Array<MenuLink>;
};

export type NavColumn = {
  columnTitle?: string;
  links?: Array<object>;
  colKey?: string;
  route?: string;
};

export type MenuLink = {
  title?: string;
  key?: string;
  route?: string;
  newRoute?: string;
  columns?: Array<SubMenuParentLink>;
};

export type SubMenuParentLink = {
  route: string;
  colKey: string;
  copy: string;
  linkKey: string;
  columnTitle: string;
  newRoute?: string;
  links: Array<SubMenuChildLink>;
};

export type SubMenuChildLink = {
  copy: string;
  flags: string;
  id: string;
  isBold: boolean;
  linkKey: string;
  route: string;
  newRoute?: string;
  nestedLinks: Array<{
    copy: string;
    id: string;
    _modelApiKey: string;
    isBold: boolean;
    route: string;
    newRoute?: string;
    supportedCountries: {
      code: string;
    }[];
  }>;
  supportedCountries: {
    code: string;
  }[];
};

export type ShowroomLocation = {
  title: string;
  handle: string;
  location: string;
  coords: number[];
  appointmentOptions: {
    productType: string;
    appointmentId: number;
  }[];
} | null;
