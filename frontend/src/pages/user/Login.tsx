import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import axios from "axios"
import { UserContext } from "../../contexts/UserContext"
import { getUser } from "../../services/AuthService"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useFetchData } from "../../hooks/useFetchData"
import Spinner from "../../components/Spinner"

const Login = () => {
  const { theme } = useContext(ThemeContext)
  const { user, setUser } = useContext(UserContext)
  const [isPending, setPending] = useState(true);
  const navigate = useNavigate();

  useFetchData({ setUser, setPending });

  useEffect(() => {
    if (localStorage.getItem('accessToken')) navigate('/user/dashboard');

  }, [navigate, user])

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection;

    const userData = {
      email: (elements.namedItem("email") as HTMLInputElement)?.value,
      password: (elements.namedItem("password") as HTMLInputElement)?.value
    }


    axios.post('/api/users/login', userData)
      .then(async (res) => {
        localStorage.setItem('accessToken', res.data.token);
        setUser(await getUser());
        navigate('/user/dashboard')
      }).catch((err) => {
        console.error(err);
        toast.error('Sikertelen bejelentkezés, kérjük próbálja más adatokkal!');
      })
  }



  return (
    <>
      {isPending ? <Spinner /> : (
        <div className={`container-fluid mx-auto vh-100 ${theme === 'light' ? 'bg-white' : 'bg-slate-700'}`}>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={loginUser}>
                <div>
                  <label className="block text-left text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input id="email" name="email" type="email" placeholder="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" placeholder="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
              </form>

              <Link to={'/user/register'}>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
