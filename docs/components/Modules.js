import Link from "next/link"

import ResponsiveTable from "./ResponsiveTable"

function Modules() {
  return (
    <ResponsiveTable>
      <table className="mx-auto">
        <thead>
          <tr>
            <th>MODULES</th>
            <th>TYPE</th>
            <th>LINKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link href="/usemetamask">@forta/useMetamask</Link>
            </td>
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
    </ResponsiveTable>
  )
}

export default Modules
