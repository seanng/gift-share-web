import { useRouter } from 'next/router'
import Stepper from 'components/Stepper'

function Layout({ children }) {
  const router = useRouter()
  if (router.pathname === '/') {
    return children
  }

  return (
    <>
      <Stepper />
      {children}
    </>
  )
}

export default Layout
