import { HtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("simpleDate", (dateObj) => {
    // Formats as "Sep 29, 2025" based on default locale
    return dateObj.toLocaleString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  });

  return {
    // ... other configs
    pathPrefix: "/personal-blog/",
  };
};
