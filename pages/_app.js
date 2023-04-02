import '@/styles/globals.css'

import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
  <>
  {/* //session = {session}인지 pageProps.session인지 확인해야함 */}
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </>
  )
}
