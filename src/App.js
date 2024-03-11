import './App.css';
import Storage from './components/Storage';
import Auth from './components/auth';
import Movies from './components/movies';

function App() {
  
  return (
    <div className="App">
      <Auth/>
      <Movies/>
      <Storage/>
    </div>
  );
}

export default App;
