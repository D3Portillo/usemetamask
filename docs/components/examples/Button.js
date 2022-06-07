function Button({ children = null, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#111111",
        padding: ".5rem 1rem",
        color: "white",
        borderRadius: ".5rem",
        fontWeight: "bold",
        border: "rgb(26, 32, 44) 1px solid",
      }}
    >
      {children}
    </button>
  )
}

export default Button
