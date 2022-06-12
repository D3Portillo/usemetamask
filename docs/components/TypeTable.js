import ResponsiveTable from "./ResponsiveTable"

function TypeTable({ children = null }) {
  return (
    <ResponsiveTable>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Returns</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </ResponsiveTable>
  )
}

export default TypeTable
