import { toast } from "react-toastify";
import { fetchAuthentication } from "../../services/AuthService";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import Spinner from "../../components/Spinner";
import { CardType } from "./CardList";
import { replaceWordInSentence } from "../../helpers/replaceWordInSentence";

type ThemesType = {
  _id: string,
  name: string
  description: string
  color: string
}

const CardForm = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();

  const { user, setUser } = useContext(UserContext);
  const [isPending, setPending] = useState(true);
  const [themes, setThemes] = useState<ThemesType[]>([]);
  const [card, setCard] = useState<CardType | null>(null);



  useFetchUserData({ setUser, setPending });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/user/login');


    if (cardId) {
      fetchAuthentication.get(`/api/cards/${cardId}`)
        .then(res => {
          const { data } = res.data;
          setCard(data);
        })
    }
    fetchAuthentication.get('/api/themes').then(res => {
      const { data } = res.data
      console.log(data);

      setThemes(data)
    }).catch(err => console.error(err)
    )
  }, [navigate, user, cardId])



  const updateCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection;
    const fileInput = elements.namedItem("file") as HTMLInputElement;
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    const updatedCard = {
      word: (elements.namedItem("word") as HTMLInputElement)?.value,
      translate: (elements.namedItem("translate") as HTMLInputElement)?.value,
      sentence: (elements.namedItem("sentence") as HTMLInputElement)?.value,
      themeId: (elements.namedItem("theme") as HTMLInputElement)?.value,
    };

    const formData = new FormData();
    formData.append('file', file as Blob); // Fájl hozzáadása a formData-hoz

    // updatedCard objektum átalakítása JSON formátumba és hozzáadása a formData-hoz
    formData.append('data', JSON.stringify(updatedCard));

    try {
      await fetchAuthentication.put(`/api/cards/${cardId}`, formData);
      toast.success('Kártya sikeresen frissítve!');
      navigate('/cards');
    } catch (error) {
      // Hiba kezelése
      console.error('Hiba történt a kártya küldése közben:', error);
    }
  };








  const sendCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements as HTMLFormControlsCollection;
    const fileInput = elements.namedItem("file") as HTMLInputElement;
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    const newCard = {
      word: (elements.namedItem("word") as HTMLInputElement)?.value,
      translate: (elements.namedItem("translate") as HTMLInputElement)?.value,
      sentence: (elements.namedItem("sentence") as HTMLInputElement)?.value,
      themeId: (elements.namedItem("theme") as HTMLInputElement)?.value,
    }

    const formData = new FormData();
    formData.append('file', file as Blob); // Fájl hozzáadása a formData-hoz
    formData.append('data', JSON.stringify(newCard)); // Új kártya adatok hozzáadása a formData-hoz

    try {
      await fetchAuthentication.post('/api/cards/store', formData)
        .then(() => {
          toast.success('Kártya sikeresen létrehozva!');
          navigate('/cards');
        })
    } catch (error) {
      // Hiba kezelése
      console.error('Hiba történt a kártya küldése közben:', error);
    }
  }








  return (
    <>
      {isPending ? <Spinner /> : (
        <div className="container-fluid flex flex-col items-center justify-center p-3 " >
          <h1 className="text-4xl mb-12 py-5">{card ? 'Kártya frissítése' : 'Kártya hozzáadása'}</h1>
          <form className="w-full max-w-lg max-h-minp-5" onSubmit={card ? updateCard : sendCard}>
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
                  required
                  defaultValue={card ? card.word : ''}

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
                  defaultValue={card ? card.translate : ''}
                  required
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
                  defaultValue={card ? replaceWordInSentence(card.translate, card.sentence) : ''}

                  required
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
                  {/* Téma bejárása és option elemek generálása */}
                  {themes.map(theme => (
                    <option
                      key={theme._id}
                      value={theme._id}
                      selected={(card && card.theme && card.theme.name === theme.name) ? true : undefined}
                    >
                      {theme.name}
                    </option>



                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3">Hozzáad</button>

          </form >
        </div >
      )}
    </>
  );
};

export default CardForm;
