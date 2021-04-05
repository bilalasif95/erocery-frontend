import { getDBIdFromGraphqlId } from "../../utils";

const getVariantsStructuredData = (variants, priceValidUntil) => {
  const inStock = "https://schema.org/InStock";
  const outOfStock = "https://schema.org/OutOfStock";
  return variants.map(variant => ({
    "@type": "Offer",
    availability: variant.isAvailable ? inStock : outOfStock,
    itemCondition: "https://schema.org/NewCondition",
    price: variant.pricing.price.gross.amount.toFixed(2),
    priceCurrency: variant.pricing.price.gross.currency,
    priceValidUntil: new Date(priceValidUntil).toLocaleString(),
    sku: variant.sku,
    url: location.href,
  }));
};

export const structuredData = product => {
  const images = product.images.map(image => new URL(image.url).pathname);
  const variants = product.variants;
  const sku = variants.map(variant => variant.sku);
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "100",
    },
    brand: {
      "@type": "Brand",
      name: "Erocery",
    },
    description: !product.seoDescription
      ? `${product.description}`
      : `${product.seoDescription}`,
    image: images,
    mpn: getDBIdFromGraphqlId(product.id, "Product"),
    name: !product.seoTitle ? `${product.name}` : `${product.seoTitle}`,
    offers: getVariantsStructuredData(variants, product.updatedAt),
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Erocery"
      },
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: "4.8",
      },
    },
    sku,
    url: location.href,
  });
};
