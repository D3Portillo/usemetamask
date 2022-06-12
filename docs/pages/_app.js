import { useEffect } from "react"
import "nextra-theme-docs/style.css"
import "../styles.css"

const ON_RESIZE = "resize"
export default function Nextra({ Component, pageProps }) {
  useEffect(() => {
    function closeMobileMenu() {
      const navButton = document.querySelector("nav button.md\\:hidden")
      const isShowingMenu = document.body.classList.contains("overflow-hidden")
      if (isShowingMenu && navButton) {
        navButton.click()
      }
    }
    window.addEventListener(ON_RESIZE, closeMobileMenu)
    return () => {
      window.removeEventListener(ON_RESIZE, closeMobileMenu)
    }
  }, [])
  return <Component {...pageProps} />
}
