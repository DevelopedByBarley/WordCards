import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import Spinner from "../../components/Spinner";

const AddTheme = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [isPending, setPending] = useState(true);

  useFetchData({ setUser, setPending });

  useEffect(() => {
    
    if (!localStorage.getItem('accessToken')) navigate('/user/login');
  }, [navigate, user])

  const sendTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection;

    const newTheme = {
      name: (elements.namedItem("name") as HTMLInputElement)?.value,
      color: (elements.namedItem("color") as HTMLInputElement)?.value,
    }

    console.log(newTheme);


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
                      <option defaultValue='' defaultChecked disabled>
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
              </div>
              <button type="submit" className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3">Hozzáad</button>
            </form>
          </div>
        )}</>
  );
};

export default AddTheme;
