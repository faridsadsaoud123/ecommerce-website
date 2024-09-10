import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home';
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage';
function App() {
  return (
    <Router>
      <Header />
        <main className=" min">
          <Container>
            <Routes>
              <Route path="/" Component={Home} exact/>
              <Route path="/product/:id" Component={ProductPage}/>
              <Route path="/cart/:id?" Component={CartPage}/>
            </Routes>
          </Container> 
        </main>
      <Footer />
    </Router>
  );
}

export default App;
