require("babel-register")({
  presets: ["es2015", "react"],
});
let slugs = {
  category: [
    "atta-and-other-flour/60/",
    "baby-care/94/",
    "biscuits-and-snacks/92/",
    "body-soap-hand-wash-and-sanitizer/91/",
    "bread-and-eggs/90/",
    "bundle-deals/95/",
    "canned-food/89/",
    "detergent-and-laundry-additives/88/",
    "dishwash-soap-and-cleaners/87/",
    "edible-oil-and-ghee/86/",
    "fresh-fruits/98/",
    "fresh-meat/101/",
    "fresh-vegetables/100/",
    "hair-care/85/",
    "hygiene-and-tissues/84/",
    "jam-honey-and-spreads/83/",
    "ketchup-and-sauces/82/",
    "milk-and-dairy-products/79/",
    "noodles-and-pasta/76/",
    "oral-care/74/",
    "pulses-and-rice/70/",
    "qurbani-service/103/",
    "repellents-and-shoe-care/61/",
    "salt-and-sugar/69/",
    "skin-care/65/",
    "softdrinks-and-mineral-water/68/",
    "spices-and-dry-fruits/64/",
    "sweets-and-deserts/63/",
    "tea-and-coffee/62/",
  ],
  page: [
    "How-to-Order/",
    "Return-and-Refund/",
    "Delivery-Details/",
    "Terms-and-Conditions/",
    "Privacy-Policy/",
    "About-Us/",
  ],
  blog: [
    "Online-Grocery-Stores-in-Islamabad-and-Rawalpindi/",
    "impacts-of-covid-19-on-e-commerce/",
    "healthy-eating-habits/",
    "6-tips-to-create-your-next-online-grocery-list/",
    "advantages-and-disadvantages-of-online-shopping/",
    "challenges-in-online-grocery-businesses/",
    "e-grocery-ecosystem-in-pakistan/",
    "how-to-sanitize-fruits-vegetables/",
    "Impacts-of-Online-Grocery-Store-Apps-on-Traditional-Shopping/",
    "is-grocery-delivery-safe-during-covid-19-pandemic/",
    "Money-Saving-Hacks-For-Online-Shopping/",
    "online-grocery-store/",
    "online-qurbani-service-in-rawalpindi-and-islamabad/",
    "succeeding-in-online-grocery/",
    "things-to-start-a-successful-online-grocery-store/",
    "traditional-vs-online-grocery-shopping-we-did-the-math-for-you/",
    "covid-19-third-wave-and-online-grocery-shopping/",
    "online-qurbani-service-buy-qurbani-animals-online-at-erocery/",
    "ramadan-deals-by-erocery-a-huge-success/",
    "why-do-people-prefer-online-shopping-in-pakistan/",
    "qurbani-rules-and-regulations-according-to-sunnah-full-guide/",
  ],
};
const pathsConfig = {
  "/category/:slug": [
    {
      slug: slugs.category,
    },
  ],
  "/page/:slug": [
    {
      slug: slugs.page,
    },
  ],
  "/blog/:slug": [
    {
      slug: slugs.blog,
    },
  ],
};

const router = require("./app/routes/routes-sitemap.js").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .applyParams(pathsConfig)
    .build("https://erocery.com/")
    .save("./sitemap.xml")
    .save("./dist/sitemap.xml");
}

generateSitemap();
