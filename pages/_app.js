import '@/styles/globals.css'
import NavMenu from '@/comp/NavMenu'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
  <>
  {/* //session = {session}인지 pageProps.session인지 확인해야함 */}
    <SessionProvider session={session}>
      <NavMenu href="/">Home</NavMenu>
      <NavMenu href="/addNote">To Do Lists</NavMenu>
      <Component {...pageProps} />
    </SessionProvider>
  </>
  )
}
