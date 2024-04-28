import { toast } from "react-toastify";
import { fetchAuthentication } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useFetchData } from "../../hooks/useFetchData";
import Spinner from "../../components/Spinner";

const AddCard = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [isPending, setPending] = useState(true);

  useFetchData({ setUser, setPending });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/user/login');
  }, [navigate, user])

  const sendCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection;
    const fileInput = elements.namedItem("file") as HTMLInputElement;
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    const newCard = {
      word: (elements.namedItem("word") as HTMLInputElement)?.value,
      translate: (elements.namedItem("translate") as HTMLInputElement)?.value,
      sentence: (elements.namedItem("sentence") as HTMLInputElement)?.value,
      theme: (elements.namedItem("theme") as HTMLInputElement)?.value,
    }

    const formData = new FormData();
    formData.append('file', file as Blob); // Fájl hozzáadása a formData-hoz
    formData.append('data', JSON.stringify(newCard)); // Új kártya adatok hozzáadása a formData-hoz

    try {
      const response = await fetchAuthentication.post('/api/cards/store', formData)
        .then(res => {
          console.log(res.data);
          toast.success('Kártya sikeresen létrehozva!');
          navigate('/cards/store');
        })

      console.log(response);
    } catch (error) {
      // Hiba kezelése
      console.error('Hiba történt a kártya küldése közben:', error);
    }
  }






  return (
    <>
      {isPending ? <Spinner /> : (
        <div className="container-fluid vh-100 flex flex-col items-center justify-center p-3 mt-32 md:mt-0" >
          <h1 className="text-4xl mb-12">Kártya</h1>
          <form className="w-full max-w-lg max-h-minp-5" onSubmit={sendCard}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="word" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Szó
                </label>
                <input
                  id="word"
                  type="text"
                  placeholder="Szó"
                  name="word"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <p className="text-red-500 text-xs italic"></p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="translate" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                  Fordítás
                </label>
                <input
                  id="translate"
                  type="text"
                  placeholder="Fordítás"
                  name="tranlate"
                  autoComplete="off"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="sentence" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Példamondat
                </label>
                <input
                  id="sentence"
                  type="text"
                  placeholder="Példamondat"
                  name="sentence"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                <label htmlFor="theme" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Téma kiválasztása
                </label>
                <select
                  id="grid-state"
                  name="theme"
                  required
                  className="mb-7 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value='' defaultChecked>
                    Válassza ki a témát
                  </option>
                  <option value='bg-red-600'>
                    Piros
                  </option>
                  <option value='bg-blue-600'>Kék</option>
                  <option value='bg-purple-600'>Lila</option>
                </select>
              </div>


              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" name="file" className="hidden" />
                </label>
              </div>

              <button type="submit" className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3">Hozzáad</button>

            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddCard;
