import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {useRef } from "react";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tv from "./components/Tv";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import DetailCrew from "./components/DetailCrew";
import DetailTv from "./components/DetailTv";
import SearchMovie from "./components/SearchMovie";
import Videos from "./components/Videos";
import MovieVideo from "./components/MovieVideo";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Ref=useRef();
  const handleClick=()=>{
    Ref.current.classList.toggle("small");
  }


  return (
  <BrowserRouter> 
      <div className="navbar" ref={Ref}>
        <Link to="/" onClick={handleClick}>Home</Link>
        <Link to="/searchmovie" onClick={handleClick}>Search</Link>
        <Link to="/movies" onClick={handleClick}>Movies</Link>
        <Link to="/videos" onClick={handleClick}>Videos</Link>
        <Link to="/tv" onClick={handleClick}>TvShows</Link>
        <Link className="bars"><FaBars onClick={handleClick} /></Link>
      </div>
      <div className="routes">
        <Routes>
          <Route element={<Home />} path="/"/>
          <Route element={<Movies />} path="/movies"/>
          <Route element={<Videos />} path="/videos"/>
          <Route element={<SearchMovie />} path="/searchmovie"/>
          <Route element={<Tv />} path="/tv"/>
          <Route element={<Detail />} path="/detail/:id"/>
          <Route element={<DetailCrew />} path="/detailcrew/:id"/>
          <Route element={<DetailTv />} path="/detailtv/:id"/>
          <Route element={<MovieVideo />} path="/movievideo/:id"/>
        </Routes>
      </div>
      <div className="footer-card">
        <Footer/>
      </div>
  </BrowserRouter>
)}

export default App;