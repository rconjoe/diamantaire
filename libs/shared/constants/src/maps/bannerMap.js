import { BLACK, NYC_BROWN } from '../styles/colors';

const NY_BANNER_HTML = `
<span>
<div>
  Our Diamond Appointments are traveling to you!
</div>
<a href="https://vraiandoro.com/pages/diamond-appointments" style="font-weight: 600;">Book a diamond appointment</a>
<span>
  June 20 - 25th to see the full shine of our sustainably grown diamonds, plus a sneak peek at new engagement designs!
</span>
</span>`;

const NY_BANNER = {
  backgroundColor: NYC_BROWN,
  bannerBar: {
    text: 'Coming Soon to the NYC',
    color: BLACK,
    emoji: '🍎',
  },
  bannerContent: {
    html: NY_BANNER_HTML,
    listItems: [],
  },
};

const LA_BANNER_HTML = `
<span>
<a href="https://vraiandoro.com/pages/diamond-appointments" style="font-weight: 600;">Meet with our Engagement Specialists</a>
<span>
  in our sunny DTLA appointment space.
</span>
<br/><br/>
<div>We’ll answer your questions and show you the full shine of our diamonds & ring settings, with no pressure to purchase.</div>
</span>`;

const LA_BANNER = {
  backgroundColor: '#CED8D9',
  bannerBar: {
    text: 'Book A Private Engagement Appointment',
    color: BLACK,
    emoji: '🏙️',
  },
  bannerContent: {
    html: LA_BANNER_HTML,
    listItems: [],
  },
};

const DEFAULT_BANNER_HTML = `
<span>
Changing our name to Vrai (meaning “Truth”) is a symbol of our evolution — a reminder of who we are, where we’ve come from, and
where we plan to go. We still believe in solid gold, sustainable diamonds, and ethical partnerships, but today we’re expanding
our horizons and thinking differently about what modern luxury means to us. <br /> <br />
<a href="https://vrai.com/blogs/journal/vrai-means-truth" style="font-weight: 600;">Learn more</a>
about why our name has evolved but our values always remain the same.
</span><br /><br />`;

const DEFAULT_BANNER = {
  backgroundColor: '#d9b9ac',
  bannerBar: {
    text: 'Hello! We’re Vrai',
    color: BLACK,
    emoji: '👋',
  },
  bannerContent: {
    html: DEFAULT_BANNER_HTML,
    listItems: [],
  },
};

export default {
  default: { content: DEFAULT_BANNER, isActive: true },
  NY: { content: NY_BANNER, isActive: false },
  LA: { content: LA_BANNER, isActive: false },
};

/* Example Banner
const motherDayHtml = `<div  style="padding-bottom: 20px;">
  Make sure your gift arrives in time by following our Mother's Day timeline.
  <div style="font-weight: 600;"><a href="https://vraiandoro.com/collections/mothers-day">Shop Gifts</a></div>
</div>`;

const mothersDayBanner = {
  backgroundColor: OFF_ORANGE,
  bannerBar: {
    text: 'For Mothers, Mamas & More',
    color: BLACK,
    emoji: '💝',
  },
  bannerContent: {
    html: motherDayHtml,
    listItems: [
      {
        date: '4/28',
        isCrossedOut: false,
        segments: [
          {
            text: 'Engraved Pieces',
            isLink: false,
            route: null,
          },
        ],
      },
      {
        date: '4/29',
        isCrossedOut: false,
        segments: [
          {
            text: 'Made to Order & Engagement',
            isLink: false,
            route: null,
          },
        ],
      },
      {
        date: '5/1',
        isCrossedOut: false,
        segments: [
          {
            text: 'Ground Shipping (Noon PST)',
            isLink: false,
            route: null,
          },
        ],
      },
      {
        date: '5/7',
        isCrossedOut: false,
        segments: [
          {
            text: '2-Day Shipping (Noon PST)',
            isLink: false,
            route: null,
          },
        ],
      },
      {
        date: '5/9',
        isCrossedOut: false,
        segments: [
          {
            text: 'Overnight Shipping (Noon PST)',
            isLink: false,
            route: null,
          },
        ],
      },
    ],
  },
};
*/
