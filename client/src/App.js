import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CreatePrivateCat from './components/CreatePrivateCat/CreatePrivateCat'
import FemaleCats from './components/FemaleCats/FemaleCats'

function App() {
  return (
    <div className="container">
      <Header />
      <FemaleCats />
      <Footer />
    </div>
  );
}

export default App;
