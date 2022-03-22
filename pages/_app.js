import '../scss/variables.scss';
import '../scss/typograph.scss';
import '../scss/globals.scss'
import Container from '@mui/material/Container';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Header/>
        <Container fixed>
            <Component {...pageProps} />
        </Container>
        <Footer/>
      </>
  )
}

export default MyApp
