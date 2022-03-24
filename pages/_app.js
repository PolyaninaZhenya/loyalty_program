import '../scss/variables.scss';
import '../scss/typograph.scss';
import '../scss/globals.scss'
import Container from '@mui/material/Container';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {AuthProvider} from "../context/auth"
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <AuthProvider>
            <NextNProgress
                color="#000585"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
                nonce="my-nonce"
            />
            <Header/>
            <Container fixed>
                <Component {...pageProps} />
            </Container>
            <Footer/>
        </AuthProvider>
      </>
  )
}

export default MyApp
