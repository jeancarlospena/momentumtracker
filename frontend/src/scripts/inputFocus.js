export const inputFocus = (e, inputToRef) => {
  if (e.key === "Enter") {
    e.preventDefault();
    inputToRef.current.focus();
  }
}