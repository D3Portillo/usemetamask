function StartBanner() {
  return (
    <div
      style={{ gap: ".5rem", marginTop: ".5rem", marginBottom: "1rem" }}
      className="flex items-center"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label="NPM version"
        href="https://www.npmjs.com/package/@forta/usemetamask"
      >
        <img src="https://badgen.net/npm/v/@forta/usemetamask" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Package size"
        href="https://bundlephobia.com/result?p=@forta/usemetamask"
      >
        <img src="https://badgen.net/bundlephobia/minzip/@forta/usemetamask" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label="License"
        href="https://github.com/D3Portillo/usemetamask/blob/master/LICENSE"
      >
        <img src="https://badgen.net/npm/license/@forta/usemetamask" />
      </a>
    </div>
  )
}

export default StartBanner
