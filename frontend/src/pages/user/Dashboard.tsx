import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserData } from "../../hooks/useFetchUserData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isPending, setPending] = useState(true);

  useFetchUserData({ setUser, setPending });



  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/user/login');
  }, [navigate, user])

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <div className="container-fluid vh-100 flex flex-col items-center justify-center">
          <div className={`vh-2/5 flex items-center justify-center space-x-80`}>
            <Link to={'/user'}>
              <button className="border px-8 py-3 shadow-lg text-lg">Profil</button>
            </Link>
            <Link to={'/themes'}>
              <button className="border rounded-lg px-8 py-3 shadow-lg text-lg">Témák</button>
            </Link>
            <Link to={'/cards'}>
              <button className="border px-8 py-3 shadow-lg text-lg">Kártyák</button>
            </Link>
          </div>
          <Link to={'/cards/store'}>
            <button className="mt-20 border px-8 py-3 shadow-lg text-lg">Kártya hozzáadása</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;


