// Create a file called 'withAuth.js'
import { useRouter } from 'next/router';

const Auth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      router.push('/dashboard');
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default Auth;
