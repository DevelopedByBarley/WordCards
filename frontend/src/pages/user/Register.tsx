import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useFetchData } from "../../hooks/useFetchData"

const Register = () => { 
  const { theme } = useContext(ThemeContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();

  const [isPending, setPending] = useState(true);

  useFetchData({ setUser, setPending });

  useEffect(() => {
    if (user.email) navigate('/user/dashboard');
  }, [navigate, user])

  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements as HTMLFormControlsCollection;

    const userData = {
      email: (elements.namedItem("email") as HTMLInputElement)?.value,
      password: (elements.namedItem("password") as HTMLInputElement)?.value,
      capacity: (elements.namedItem("capacity") as HTMLInputElement)?.value
    }

    axios.post('/api/users/register', userData).then(res => {
      console.log(res);
      setPending(true)
      toast.success('Sikeres regisztráció');
      navigate('/user/login')
    }).catch((err) => {
      console.error(err)
      toast.error('Probléma regisztráció során! Próbálja meg más adatokkal!')
    }).catch(() => setPending(false));



  }

  return (
    <div className={`container-fluid mx-auto vh-100 ${theme === 'light' ? 'bg-white' : 'bg-slate-700'}`}>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" placeholder="email" required className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" placeholder="current-password" required className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">Capacity</label>
                <select name="capacity" required id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value='' selected>Válaszd ki naponta hány szót szeretnél tanulni</option>
                  <option value="3">Kezdő (3)</option>
                  <option value="5">Haladó (5)</option>
                  <option value="7">Vakmerő (7)</option>
                  <option value="10">Profi (10)</option>
                </select>              </div>
            </div>

            <div>
              <button type="submit" disabled={isPending}  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isPending ? 'loading' : 'Register'}</button>
            </div>
          </form>

          <Link to={'/user/login'}>
            <p className="mt-10 text-center text-sm text-gray-500">
              Do you have an account?
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
