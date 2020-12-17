import React from 'react';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from '../Header';
import Homepage from '../../pages/Homepage';
import Bookspage from '../../pages/Bookspage';
import LogsPage from '../../pages/LogsPage'; 
import UserPage from '../../pages/UserPage'; 
import LendingPage from '../../pages/LendingPage';


const App: React.FC = () => {

  return (
    <>
      <Switch>
        <>
          <Header  />
          <Route exact path="/" component={Homepage}/>
          <Route path="/users" component={UserPage}/>
          <Route path="/books" component={Bookspage}/>
          <Route path="/lendings" component={LendingPage}/>
          <Route path="/logs" component={LogsPage}/>
         </> 
      </Switch>
    </>
  );
}

export default App;
