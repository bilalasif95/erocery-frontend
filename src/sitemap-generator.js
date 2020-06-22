require("babel-register")({
  presets: ["es2015", "react"],
});
let slugs = {
  soapnames: [
      "atta-and-other-flour/49/",
      "baby-care/52/",
      "biscuits-and-snacks/27/",
      "body-soap-hand-wash-and-sanitizer/28/",
      "bread-and-eggs/29/",
      "canned-food/40/",
      "detergent-and-laundry-additives/36/",
      "dishwash-and-cleaners/31/",
      "edible-oil-and-ghee/33/",
      "hair-care/41/",
      "hygiene-and-tissues/42/",
      "jam-honey-and-spreads/35/",
      "ketchup-and-sauces/34/",
      "milk-and-dairy-products/37/",
      "noodles-and-spaghetti/38/",
      "oral-care/39/",
      "pulses-and-rice/50/",
      "repellent-and-shoe-care/47/",
      "salt-and-sugar/45/",
      "skin-care/53/",
      "softdrinks-and-mineral-water/32/",
      "spices-and-dry-fruits/46/",
      "sweets-and-deserts/30/",
      "tea-and-coffee/44/",
    ],
};
const pathsConfig = {
  "/category/:slug": [
    {
      slug: slugs.soapnames,
    },
  ],
};

const router = require("./app/routes/routes-sitemap.js").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .applyParams(pathsConfig)
    .build("https://www.erocery.com")
    .save("./dist/sitemap.xml");
}

generateSitemap();