import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const res = await axios.get('/auth/refresh-token', {
        withCredentials: true,
      });
      setAuth((prev) => ({ ...prev, accessToken: res.data.accessToken }));
      return res.data.accessToken;
    } catch (error) {
      navigate('/login', { replace: true });
      return null;
    }
  };

  return { refresh };
};

export default useRefreshToken;
