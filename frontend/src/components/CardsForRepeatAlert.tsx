import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';

const CardsForRepeatAlert = () => {
  const { user } = useContext(UserContext)
  console.log(user);

  return (
    <div className='bg-red-500'>
      {user.email && user.cardsForRepeat?.length !== 0 ? (<h1> Repeat!</h1 >) : ''}
    </div>
  )
}

export default CardsForRepeatAlert
