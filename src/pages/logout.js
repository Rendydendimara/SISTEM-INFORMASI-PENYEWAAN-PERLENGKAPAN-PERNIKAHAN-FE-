import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/use-auth';

const PageLogout = () => {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    auth.signOut();
    router.push('/auth/login');
  }, [])

  return (
    <></>
  )
};

PageLogout.getLayout = (page) => (
  <>
    {page}
  </>

);

export default PageLogout;
