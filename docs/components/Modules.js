import Link from "next/link"

import ResponsiveTable from "./ResponsiveTable"

const External = ({ href, children }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  )
}

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
              <External href="https://www.npmjs.com/package/@forta/usemetamask">
                npm
              </External>
              {", "}
              <External href="https://github.com/D3Portillo/usemetamask/tree/master/lib">
                repo
              </External>
            </td>
          </tr>

          <tr>
            <td>
              <Link href="/network">@forta/network</Link>
            </td>
            <td>Vanilla Package</td>
            <td>
              <External href="https://www.npmjs.com/package/@forta/network">
                npm
              </External>
              {", "}
              <External href="https://github.com/D3Portillo/forta/tree/master/packages/network">
                repo
              </External>
            </td>
          </tr>
        </tbody>
      </table>
    </ResponsiveTable>
  )
}

export default Modules
