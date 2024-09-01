interface ButtonLoadingProps {
  isSubmit?: boolean
  value?: string
}
const ButtonLoading = (props: ButtonLoadingProps) => {
  const { isSubmit, value } = props

  return (
    <button disabled={isSubmit} className="btn btn-primary mr-1">
      {isSubmit && <span className="spinner-border spinner-border-sm mr-1"></span>}
      {value}
    </button>
  )
}

export default ButtonLoading