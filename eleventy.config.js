export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("simpleDate", (dateObj) => {
    // Formats as "Sep 29, 2025" based on default locale
    return dateObj.toLocaleString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  });
};
