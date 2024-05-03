import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import useFetchDataAndPaginate from "../../hooks/useFetchDataAndPaginate";

type ThemesType = {
  _id: string
  name: string
  description: string
  color: string
  cards: []
}


const Themes = () => {

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState<ThemesType[]>([]);
  const [isPending, setPending] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [numOfPage, setNumOfPage] = useState(1);
  const entity = 'themes'

  const fetchThemes = useFetchDataAndPaginate({ entity, setNumOfPage, setCurrentPage, setData, setPending }); 
  useFetchUserData({ setUser, setPending });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/user/login');
    } else {
      fetchThemes(currentPage);
    }
  }, [navigate, user, currentPage, fetchThemes]);



  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          {numOfPage === 0 ? (
            <div className="container flex items-center justify-center flex-col">
              <h1 className="text-center text-3xl md:text-5xl">Jelenleg nincs egyetlen Témája sem!</h1>
              <Link to={'/themes/store'}>
                <button className="mt-3 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Téma hozzáadása</button>
              </Link>
            </div>
          ) : (
            <div className="container">
              <h1 className="text-3xl my-5 text-center">Témák</h1>
              <div className="md:flex justify-between my-5">
                <Link to={'/themes/store'}>
                  <button className="mb-4 md:mb-1 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Téma hozzáadása</button>
                </Link>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} numOfPage={numOfPage} />
              </div>
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative m-5">
                {data.map(theme => (
                  <Link key={theme._id} to={`/themes/cards/${theme._id}`}>
                    <div className={`max-w-sm ${theme.color} border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-64`}>
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{theme.name}</h5>
                        <p className="mb-3 font-normal text-white dark:text-gray-400">
                          {theme.description}
                        </p>
                        <span className="text-white border py-2 px-5">
                          {theme.cards.length} Kártya
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );

}

export default Themes
