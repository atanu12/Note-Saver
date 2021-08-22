
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Landing from './components/LandingPage/Landing';
import {BrowserRouter, Route} from 'react-router-dom'
import MyNotes from './components/MyNotes/MyNotes';

const App =()=> {
  return (
    <BrowserRouter>
    
      <Header/>
      <main>
        <Route path="/" exact component={Landing} />
        <Route path="/mynotes" component={MyNotes} />
      </main>
      <Footer/>
      
   
    </BrowserRouter>
  );
}

export default App;
