const { DateTime } = require("luxon");
const CtaBanner = require("./src/_includes/components/CtaBanner");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy("src/fonts/");
  eleventyConfig.addPassthroughCopy("src/scripts/");
  eleventyConfig.addPassthroughCopy("src/admin/");

  eleventyConfig.addShortcode("CtaBanner", CtaBanner);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // eleventyConfig.addFilter("truncateUrl", (url) => {
  //   console.log(url);
  //   if (url.toLocaleString().includes("html")) {
  //     return url.toLocaleString.splice(0, -5);
  //   } else {
  //     return url;
  //   }
  // });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormts: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
