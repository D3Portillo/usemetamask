function DataCard({ children = null }) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        gap: ".5rem",
      }}
    >
      {children}
    </section>
  )
}

export default DataCard
