import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "gif"],
    widths: ["auto"],

    sharpOptions: {
      animated: true,
    },

    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {},
    },
  });

  // --- Helper Functions ---

  eleventyConfig.addFilter("simpleDate", (dateObj) => {
    // Formats as "Sep 29, 2025" based on default locale
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  });

  eleventyConfig.addFilter("dateStamp", (d) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  eleventyConfig.addCollection("tagList", function (collectionApi) {
    let tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet]
      .filter((tag) => !["all", "posts"].includes(tag))
      .toSorted();
  });

  eleventyConfig.addFilter("sortAlphabetically", (arr) => {
    if (!Array.isArray(arr)) {
      console.log("Not an array.");
      return arr;
    }
    return [...arr]
      .sort((a, b) => a.localeCompare(b))
      .filter((tag) => !["all", "posts"].includes(tag));
  });

  return {
    // ... other configs
    pathPrefix: "/personal-blog/",
  };
}
