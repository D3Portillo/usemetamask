/**
 * @type { import('next').NextConfig }
 */
const config = {
  theme: "nextra-theme-docs",
  themeConfig: "./nextra.config.js",
  unstable_staticImage: true,
}
const withNextra = require("nextra")(config)

module.exports = withNextra()
