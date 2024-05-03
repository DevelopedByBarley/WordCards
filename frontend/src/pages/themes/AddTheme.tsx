import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import Spinner from "../../components/Spinner";
import { fetchAuthentication } from "../../services/AuthService";
import { toast } from "react-toastify";

const AddTheme = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [isPending, setPending] = useState(true);

  useFetchUserData({ setUser, setPending });

  useEffect(() => {

    if (!localStorage.getItem('accessToken')) navigate('/user/login');

  }, [navigate, user])

  const sendTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection;

    const newTheme = {
      name: (elements.namedItem("name") as HTMLInputElement)?.value,
      description: (elements.namedItem("description") as HTMLInputElement)?.value,
      color: (elements.namedItem("color") as HTMLInputElement)?.value,
    }

    fetchAuthentication.post('/api/themes/store', newTheme).then(() => {
      toast.success('Téma sikeresen hozzáadva!')
    }).catch((err) => {
      console.error(err);
      toast.error('Téma hozzáadása sikertelen!');
    })


  }

  

  return (
    <>

      {isPending ?
        <Spinner />
        : (
          <div className="container-fluid vh-100 flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl mb-12">Téma hozzáadása</h1>
            <form className="w-full max-w-lg max-h-minp-5" onSubmit={sendTheme}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-2/2 px-3 md:mb-0">
                  <label htmlFor="grid-word" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Téma neve
                  </label>
                  <input
                    id="grid-word"
                    type="text"
                    name="name"
                    placeholder="Téma neve"
                    required
                    className=" mb-7 appearance-none block w-full bg-gray-200 text-gray-700 borderrounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  />
                  <p className="text-red-500 text-xs italic"></p>
                </div>
                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Color
                  </label>
                  <div className="relative">
                    <select
                      id="grid-state"
                      name="color"
                      required
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option defaultChecked value=''>
                        Válassza ki a színét
                      </option>
                      <option value='bg-red-600'>
                        Piros
                      </option>
                      <option value='bg-blue-600'>Kék</option>
                      <option value='bg-purple-600'>Lila</option>

                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-4 px-3 mb-6">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leírás</label>
                  <textarea id="description" name="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leírás..."></textarea>
                </div>
              </div>
              <button type="submit" className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3">Hozzáad</button>
            </form>
          </div>
        )}</>
  );
};

export default AddTheme;
