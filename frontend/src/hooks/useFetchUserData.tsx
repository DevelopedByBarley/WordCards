import { SetStateAction, useEffect, Dispatch } from "react";
import { getUser } from "../services/AuthService";
import { User } from "../contexts/UserContext";

type UseFetchDataTypes = {
  setUser: Dispatch<SetStateAction<User>>,
  setPending: Dispatch<SetStateAction<boolean>>
}

export const useFetchUserData = ({ setUser, setPending }: UseFetchDataTypes) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();        
        setUser(user);
      } catch (error) {
        console.error("Hiba történt a felhasználó betöltésekor:", error);
      } finally {
        setTimeout(() => {
          setPending(false);
        }, 100);
      }
    };

    fetchData();
  }, [setUser, setPending]);
};
