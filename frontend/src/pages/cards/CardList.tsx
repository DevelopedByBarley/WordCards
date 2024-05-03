import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { fetchAuthentication } from "../../services/AuthService";
import Spinner from "../../components/Spinner";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import useFetchDataAndPaginate from "../../hooks/useFetchDataAndPaginate";
import CardRow from "../../components/CardRow";
import { ThemesType } from "../themes/Themes";



export type CardType = {
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
  theme:  ThemesType
  __v: number;
  _id: string;
};

const CardList = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState<CardType[]>([]);
  const [isPending, setPending] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [numOfPage, setNumOfPage] = useState(1);
  const entity = 'cards';


  const fetchCards = useFetchDataAndPaginate({ entity, setNumOfPage, setCurrentPage, setData, setPending });
  useFetchUserData({ setUser, setPending });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/user/login');
    } else {
      fetchCards(currentPage)
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
            <div className="container flex items-center justify-center flex-col">
              <h1 className="text-center text-3xl md:text-5xl mt-28">Jelenleg nincs egyetlen kártyája sem!</h1>
              <Link to={'/cards/store'}>
                <button className="mt-3 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Kártya hozzáadása</button>
              </Link>
            </div>

          ) : (
            <div className="container mb-44">
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

                      {data.map((card, index) => (
                        <CardRow index={index} card={card} deleteCard={deleteCard} />
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
