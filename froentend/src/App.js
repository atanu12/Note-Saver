
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Landing from './components/LandingPage/Landing';
import {BrowserRouter, Route} from 'react-router-dom'
import MyNotes from './components/MyNotes/MyNotes';
import CreateNote from './components/CreateNote/CreateNote';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import RegesterScreen from './components/RegesterScreen/RegesterScreen';

const App =()=> {
  return (
    <BrowserRouter>
    
      <Header/>
      <main>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/regester" exact component={RegesterScreen} />
        <Route path="/mynotes" component={MyNotes} />
        <Route path="/createnote" component={CreateNote} />
      </main>
      <Footer/>
      
   
    </BrowserRouter>
  );
}

export default App;
