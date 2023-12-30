import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PageLogout = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/auth/login')
  })

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
