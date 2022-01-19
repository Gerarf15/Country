import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing'
import Home from "./Components/Home/Home";
import Activity from './Components/Activity/Activity';
import Detail from './Components/Detail/Detail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element = {<Landing />}></Route>
        <Route path ="/home" element = {<Home />}></Route>
        <Route path ="/create/activity" element = {<Activity />}></Route>
        <Route path ="/countrie/detail/:idPais" element = {<Detail />}></Route>

      </Routes>
    </div>
  );
}

export default App;
