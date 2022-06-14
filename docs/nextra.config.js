import Logo from "./components/Logo"
import head from "./head.nextra"

export default {
  projectLink: "https://github.com/D3Portillo/usemetamask",
  docsRepositoryBase:
    "https://github.com/D3Portillo/usemetamask/tree/master/docs/pages",
  titleSuffix: " – @forta 💪",
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null,
  darkMode: true,
  floatTOC: true,
  footer: true,
  footerText: `${new Date().getFullYear()} - MIT, Denny Portillo.`,
  footerEditLink: `Edit this page on GitHub`,
  head,
  logo: (
    <>
      <Logo size={28} />
      <strong className="font-black">FORTA</strong>
    </>
  ),
}
