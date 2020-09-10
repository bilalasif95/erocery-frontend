import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 16;
export const SUPPORT_EMAIL = "contact@erocery.com";
export const PROVIDERS = {
  BRAINTREE: {
    label: "Braintree",
  },
  DUMMY: {
    label: "Cash On Delivery",
  },
  JAZZCASH: {
    label: "JazzCash",
  },
  OFFICEVISIT: {
    label: "OfficeVisit",
  },
  RAZORPAY: {
    label: "WireTransfer",
  },
  STRIPE: {
    href: "https://js.stripe.com/v3/",
    label: "Stripe",
  },
};

export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "facebook",
    href: "https://www.facebook.com/Erocery-109977713975774/",
    path: require("../images/facebook-icon.svg"),
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/erocerypk",
    path: require("../images/instagram-icon.svg"),
  },
  {
    ariaLabel: "whatsapp",
    href: "https://api.whatsapp.com/send?phone=923302755559&text=",
    path: require("../images/whatsapp.svg"),
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/erocery",
    path: require("../images/twitter-icon.svg"),
  },
  {
    ariaLabel: "youtube",
    href: "https://www.youtube.com/channel/UCikK5KWDrIH3MlgYirFatWg",
    path: require("../images/youtube-icon.svg"),
  },
  {
    ariaLabel: "linkedin",
    href: "https://www.linkedin.com/company/erocery",
    path: require("../images/linkedin.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description:
    "Erocery is an Online Supermarket providing Same Day Delivery in Rawalpindi & Islamabad with an interactive online grocery shopping experience.",
  image: `${window.location.origin}${require("../images/erocery_logo.svg")}`,
  title: "Best Online grocery Store(Rawalpindi & Islamabad)",
  type: "website",
  url: window.location.origin,
};
