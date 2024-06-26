import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)

  const logout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setUser({ email: null, password: null, capacity: null, cardsForRepeat: [] });
    localStorage.removeItem('accessToken');
    navigate('/user/login');
  }


  return (
    <div className="w-screen flex align-center justify-between left-0 bg-indigo-600 p-2">
      <h1 className="text-white">
        <Link to={'/'}>
          <img className="mx-auto h-10 w-auto bg-white p-1 rounded-sm" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        </Link>
      </h1>
      {
        !user.email ?
          (
            <div className="space-x-5 hidden lg:block">
              <Link to={'/user/register'}>
                <button className="bg-indigo-600 text-white hover:text-slate-200 font-bold py-2 px-4 rounded">
                  Regisztráció
                </button>
              </Link>
              <Link to={'/user/login'}>
                <button className="bg-indigo-600 text-white  hover:text-slate-200 font-bold py-2 px-4 rounded">
                  Bejelentkezés
                </button>
              </Link>
            </div>
          ) : <Button className="bg-red-600 text-white hover:text-slate-200 font-bold py-2 px-4 rounded" onClick={logout}>Logout</Button>

      }
    </div>
  );
}

export default Navbar;
