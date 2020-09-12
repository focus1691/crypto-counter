import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  const logout = async () => {
    await fetch('/.netlify/functions/api/logout');
    history.push('/');
  };

  logout();
  return null;
};

export default Logout;
