// These are the locations of our showrooms. Do not change this without checking with the dev team first.
// It's tied to geologic

export const VIRTUAL_SHOWROOM = {
  location: 'Virtual',
  handle: 'virtual',
  appointmentOptions: [
    {
      productType: 'Engagement Ring',
      appointmentId: 9855967,
    },
    {
      productType: 'Wedding Band',
      appointmentId: 12223139,
    },
    {
      productType: 'Fine Jewelry',
      appointmentId: 19827530,
    },
  ],
  es: {
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 54360023,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 54360066,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 54360105,
      },
    ],
  },
};

export const SHOWROOM_LOCATIONS = [
  {
    title: 'Visit our Los Angeles Showroom',
    handle: 'los-angeles',
    location: 'Los Angeles',
    coords: [34.083687020362056, -118.37579448955276],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 8911042,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 12223133,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 24345368,
      },
    ],
  },
  {
    title: 'Visit our Boston Showroom',
    handle: 'boston',
    location: 'Boston',
    coords: [42.35155636364817, -71.07522508610465],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 43281063,
      },
    ],
  },
  {
    title: 'Visit our London Showroom',
    handle: 'london',
    location: 'London',
    coords: [51.511692277882695, -0.14729784520403963],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 35159596,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 35159629,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 35159641,
      },
    ],
  },
  {
    title: 'Visit our Chicago Showroom',
    handle: 'chicago',
    location: 'Chicago',
    coords: [41.90091743758184, -87.62646365925384],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 34089779,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 34089814,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 34089842,
      },
    ],
  },
  {
    title: 'Visit our Madrid Showroom',
    handle: 'madrid',
    location: 'Madrid',
    coords: [40.43085693849281, -3.6866210304951386],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 31666823,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 31667123,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 31667222,
      },
    ],
  },
  {
    title: 'Visit our New York Showroom',
    handle: 'new-york',
    location: 'New York',
    coords: [40.74070797645129, -74.00756401883828],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 35159668,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 35159704,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 35159727,
      },
    ],
  },
  {
    title: 'Visit our San Francisco Showroom',
    handle: 'san-francisco',
    location: 'San Francisco',
    coords: [37.77710272172547, -122.42405118217775],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 12985422,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 12985446,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 27177834,
      },
    ],
  },
  {
    title: 'Visit our Toronto Showroom',
    handle: 'toronto',
    location: 'Toronto',
    coords: [43.670924061473684, -79.39274562053262],
    appointmentOptions: [
      {
        productType: 'Engagement Ring',
        appointmentId: 46691581,
      },
      {
        productType: 'Wedding Band',
        appointmentId: 46691630,
      },
      {
        productType: 'Fine Jewelry',
        appointmentId: 46691665,
      },
    ],
  },
];

export const ALL_SHOWROOMS = [...SHOWROOM_LOCATIONS, VIRTUAL_SHOWROOM];
