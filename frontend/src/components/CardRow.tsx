
import { Link } from 'react-router-dom'
import { CardType } from '../pages/cards/CardList'


type CardRowType = {
  index: number,
  card: CardType,
  deleteCard: (cardId: string) => void
}


const CardRow = ({ index, card, deleteCard }: CardRowType) => {
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900">{card.word}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{new Date(card.createdAt).toLocaleString('hu-HU')}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`${card.repeat ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} py-2 inline-flex text-xs leading-5 font-semibold rounded-full px-3`}>
          {new Date(card.expires).toLocaleString('hu-HU')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span>{card.state}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">

        <button onClick={() => deleteCard(card._id)} type="button" className="text-red-400 hover:text-white border border-red-400 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-300 dark:text-red-300 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-orange-900">Törlés</button>
        <Link to={`/cards/update/${card._id}`}>
          <button type="button" className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900">Frissítés</button>

        </Link>
      </td>
      {/* További táblázatcellák a kívánt kártyaadatokhoz */}
    </tr>
  )
}

export default CardRow
