import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';

const CardsForRepeatAlert = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='pt-5 pl-5'>
      {user.email && user.cardsForRepeat?.length !== 0 ? (
        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <div className='h-10 w-8 border border-white'></div>
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {user.cardsForRepeat?.length}
          </div>
        </button>

      ) : ''}
    </div>
  )
}

export default CardsForRepeatAlert
