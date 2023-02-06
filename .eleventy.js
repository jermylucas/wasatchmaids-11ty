const { DateTime } = require('luxon');
const CtaBanner = require('./src/_includes/components/CtaBanner');
const AddToContactsBtn = require('./src/_includes/components/AddToContactsBtn');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/');
  eleventyConfig.addPassthroughCopy('src/css/');
  eleventyConfig.addPassthroughCopy('src/fonts/');
  eleventyConfig.addPassthroughCopy('src/scripts/');
  eleventyConfig.addPassthroughCopy('src/admin/');
  eleventyConfig.addPassthroughCopy('src/_redirects');

  eleventyConfig.addWatchTarget('src/**/*.css');

  eleventyConfig.addShortcode('CtaBanner', CtaBanner);
  eleventyConfig.addShortcode('AddToContactsBtn', AddToContactsBtn);

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
    },
    templateFormts: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
