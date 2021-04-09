import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CreatePrivateCat from './components/CreatePrivateCat/CreatePrivateCat'
import FemaleCats from './components/FemaleCats/FemaleCats'
import MaleCats from './components/MaleCats/MaleCats'
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CatDetails from './components/CatDetails/CatDetails';
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cats/female" component={FemaleCats} />
        <Route path="/cats/male" component={MaleCats} />
        <Route path="/cat/:id" component={CatDetails}/>
        <Route path="/private/create" component={CreatePrivateCat} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
        <Route render={() => <h1 >Error Page</h1>} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
