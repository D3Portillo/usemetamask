import { useEffect } from "react"
import "nextra-theme-docs/style.css"
import "../styles.css"

const ON_RESIZE = "resize"
export default function Nextra({ Component, pageProps }) {
  useEffect(() => {
    let storedWidth = window.innerWidth
    function closeMobileMenu() {
      const newWidth = window.innerWidth
      const navButton = document.querySelector("nav button.md\\:hidden")
      const isResizeXEvent = storedWidth !== newWidth
      const isShowingMenu = document.body.classList.contains("overflow-hidden")
      if (isShowingMenu && navButton && isResizeXEvent) {
        navButton.click()
      }
      storedWidth = newWidth
    }
    window.addEventListener(ON_RESIZE, closeMobileMenu)
    return () => {
      window.removeEventListener(ON_RESIZE, closeMobileMenu)
    }
  }, [])
  return <Component {...pageProps} />
}
