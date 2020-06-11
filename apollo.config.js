module.exports = {
  client: {
    service: {
      name: "erocery",
      url: "https://backend.erocery.com/graphql/",
      includes: ["./**/*.js", "./**/*.ts"],
      excludes: ["**/__tests__/**/*"],
    },
  },
};
