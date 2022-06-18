function Button({ children = null, onClick }) {
  return (
    <button onClick={onClick} className="btn-doc">
      {children}
    </button>
  )
}

export default Button
