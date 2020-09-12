export const isLoggedIn = async () => {
  const response = await fetch('/.netlify/functions/api/auth');
  if (response.status === 200 && await response.text() === 'yes') return true;
  return false;
};
