import logo from './logo.svg';
import './App.css';
import * as catsService from './services/catsService';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      
      <Footer />
    </div>
  );
}

export default App;
