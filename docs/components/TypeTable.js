function TypeTable({ children = null }) {
  return (
    <table style={{ marginTop: "2rem" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Returns</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export default TypeTable
