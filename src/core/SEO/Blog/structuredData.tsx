export const structuredData = blog => {
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Article",
    author: blog.authorName,
    dateModified: new Date(blog.created).toLocaleString(),
    datePublished: new Date(blog.created).toLocaleString(),
    description: !blog.seoDescription
      ? `${blog.description}`
      : `${blog.seoDescription}`,
    headline: !blog.seoDescription
      ? `${blog.description}`
      : `${blog.seoDescription}`,
    image: blog.image && new URL(blog.image.url).pathname,
    mainEntityOfPage: location.href,
    name: !blog.seoTitle ? `${blog.title}` : `${blog.seoTitle}`,
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: "https://i.imgur.com/16IaGNG.png"
      },
      name: "Erocery | Best Online grocery Store(Rawalpindi & Islamabad)"
    },
    url: location.href
  });
};
