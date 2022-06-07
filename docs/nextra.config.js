import Logo from "./components/Logo"

export default {
  projectLink: "https://github.com/D3Portillo/usemetamask",
  docsRepositoryBase:
    "https://github.com/D3Portillo/usemetamask/tree/master/docs/pages",
  titleSuffix: " – @forta 🦍",
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null,
  darkMode: true,
  floatTOC: true,
  footer: true,
  footerText: `${new Date().getFullYear()} - MIT, Denny Portillo.`,
  footerEditLink: `Edit this page on GitHub`,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  ),
  logo: (
    <>
      <Logo size={28} />
      <strong className="font-black">FORTA</strong>
    </>
  ),
}
