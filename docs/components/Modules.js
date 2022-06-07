import Link from "next/link"

function Modules() {
  return (
    <table className="mx-auto">
      <thead>
        <tr>
          <th>MODULES</th>
          <th>STATUS</th>
          <th>TYPE</th>
          <th>LINKS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link href="/usemetamask">@forta/useMetamask</Link>
          </td>
          <td>PUBLISHED</td>
          <td>React Hook</td>
          <td>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.npmjs.com/package/@forta/usemetamask"
            >
              NPM
            </a>
            {", "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/D3Portillo/usemetamask/tree/master/lib"
            >
              CODE
            </a>
            {", "}
            <Link href="/usemetamask">DOCS</Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Modules
