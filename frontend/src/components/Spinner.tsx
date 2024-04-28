import { ClipLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full vh-100 flex items-center justify-center bg-white mt-14">
      <ClipLoader
        color={'currentColor'} // Az aktuális színt használja
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner
