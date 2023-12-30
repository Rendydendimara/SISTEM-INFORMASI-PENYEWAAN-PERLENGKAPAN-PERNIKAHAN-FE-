import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PageIndex = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/auth/login')
  })

  return (
    <></>
  )
};

PageIndex.getLayout = (page) => (
  <>
    {page}
  </>

);

export default PageIndex;
