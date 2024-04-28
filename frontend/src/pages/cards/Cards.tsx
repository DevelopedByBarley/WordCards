import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { fetchAuthentication } from "../../services/AuthService";
import Spinner from "../../components/Spinner";
import { useFetchData } from "../../hooks/useFetchData";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


type CardType = {
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
  __v: number;
  _id: string;
};

const Cards = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [cards, setCards] = useState<CardType[]>([]);
  const [isPending, setPending] = useState(true);

  useFetchData({ setUser, setPending });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/user/login');
    } else {
      fetchCards();
    }
  }, [navigate, user]);

  const fetchCards = () => {
    fetchAuthentication.get('/api/cards')
      .then(res => {
        setCards(res.data.cards);
        console.log(res.data.cards)
        setPending(false); // Kártyák megérkezése után beállítjuk, hogy ne legyen már isPending
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
        setPending(false); // Hiba esetén is beállítjuk, hogy ne legyen már isPending
      });
  };

  return (
    <>
      {isPending ? <Spinner /> : (
        <div>
          <h1>Cards!</h1>
          {cards.map((card, index) => (
            <Card style={{ width: '18rem' }} key={index}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{card.word}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Cards;
