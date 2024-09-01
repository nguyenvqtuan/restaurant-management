interface ITableLoaderProps {
  colSpan?: number
}

const TableLoader = (props: ITableLoaderProps) => {
  return (
    <tr className="text-center">
      <td {...props}
      >
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </td>
    </tr>
  )
}

export default TableLoader
