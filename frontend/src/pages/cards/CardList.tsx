import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { fetchAuthentication } from "../../services/AuthService";
import Spinner from "../../components/Spinner";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import { fetchDataAndPaginate } from "../../helpers/fetchDataAndPaginate";



type CardType = {
  createdAt: string;
  expires: string;
  lang: string;
  repeat: boolean;
  sentence: string;
  state: number;
  translate: string;
  updatedAt: string;
  user: string;
  word: string;
  __v: number;
  _id: string;
};

const CardList = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [cards, setCards] = useState<CardType[]>([]);
  const [isPending, setPending] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [numOfPage, setNumOfPage] = useState(1);





  useFetchUserData({ setUser, setPending });

  const fetchCards = useCallback((currentPage: number) => {
    fetchDataAndPaginate('/api/cards?page=' + currentPage, currentPage, setNumOfPage, setCurrentPage, setCards, setPending,)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/user/login');
    } else {
      fetchCards(currentPage);
    }
  }, [navigate, user, currentPage, fetchCards]);





  const deleteCard = (cardId: string) => {
    fetchAuthentication.delete(`/api/cards/${cardId}`).then(() => {
      toast.success('Kártya törlése sikeres volt!');
      fetchCards(currentPage)

    }).catch((err) => {
      console.error(err);
      toast.error('Kártya törlése sikertelen!');
    })
  }
  return (

    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          {numOfPage === 0 ? (
            <div className="container vh-100 flex items-center justify-center flex-col">
              <h1 className="text-center text-3xl md:text-5xl">Jelenleg nincs egyetlen kártyája sem!</h1>
              <Link to={'/cards/store'}>
                <button className="mt-3 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Kártya hozzáadása</button>
              </Link>
            </div>
          ) : (
            <div className="container">
              <div className="md:flex justify-between my-5">
                <Link to={'/cards/store'}>
                  <button className="mb-4 md:mb-1 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Kártya hozzáadása</button>
                </Link>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} numOfPage={numOfPage} />
              </div>
              <div className="container overflow-x-scroll">
                <div className="min-h-50">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Név</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Létrehozva</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lejár</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Státusz</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Műveletek</th>
                        {/* További fejlécek a kívánt kártyaadatokhoz */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cards.map((card, index) => (
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
                            <button type="button" className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900">Frissítés</button>
                          </td>
                          {/* További táblázatcellák a kívánt kártyaadatokhoz */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>

  );
};

export default CardList;
