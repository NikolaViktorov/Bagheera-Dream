import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CreatePrivateCat from './components/CreatePrivateCat/CreatePrivateCat'
import FemaleCats from './components/FemaleCats/FemaleCats'
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';
import { createPrivateCat } from './services/catsService';

function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact>
          
        </Route>
        <Route path="/cats/female" component={FemaleCats} />
        <Route path="/private/create" component={createPrivateCat} />
        <Route render={() => <h1 >Error Page</h1>} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
