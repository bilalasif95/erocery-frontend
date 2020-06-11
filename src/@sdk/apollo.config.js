module.exports = {
  client: {
    includes: ["./queries/*.ts", "./mutations/*.ts", "./fragments/*.ts"],
    service: {
      name: "erocery",
      url: "https://backend.erocery.com/graphql/"
    }
  }
};
