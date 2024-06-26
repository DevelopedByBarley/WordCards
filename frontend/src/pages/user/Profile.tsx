import { useContext, useEffect, useState } from 'react'
import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Spinner from '../../components/Spinner';

const Profile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [isPending, setPending] = useState(true);

  useFetchUserData({ setUser, setPending });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/user/login');
  }, [navigate, user])

  return (
    <>
      {isPending ? <Spinner /> : (
        <div>
          <h1>{user.email}</h1>
        </div>
      )}
    </>
  )
}

export default Profile
