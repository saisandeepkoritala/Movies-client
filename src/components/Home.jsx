import axios from "axios"
import {useEffect,useState } from 'react'
import {RotatingLines} from "react-loader-spinner"
import {Link} from "react-router-dom"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {

  const[teluguData,SetteluguData]=useState([]); 
  const[hindiData,SethindiData]=useState([]);
  const[tamilData,SettamilData]=useState([]);
  
  useEffect(()=>{

    const getData=async()=>{

      const fectheddata = await axios.get("http://localhost:5000/getTeluguMovies")
      SetteluguData(fectheddata.data?.Movies?.results)

      const fecthedhindi = await axios.get("http://localhost:5000/getHindiMovies")
      SethindiData(fecthedhindi.data?.Movies?.results)

      const fecthedtamil = await axios.get("http://localhost:5000/getTamilMovies")
      SettamilData(fecthedtamil.data?.Movies?.results)

    }

    getData()
    
  },[])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 ,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 3,
      slidesToSlide: 2 
    },
    other: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1 
    },
  };

  let teluguMovies="";
  let hindiMovies="";
  let tamilMovies="";

  const loading=()=>{
    return <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
  />
  }

  const renderCards=(data)=>{
      return data.map((movie)=>{
        if(movie.poster_path){
        return <Link key={movie.id} to={`/detail/${movie.id}`} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className='card' height="400px"></img>
        </Link>
        }
        else{
          return []
        }
      })
  }

  if(teluguData?.length > 0){
    teluguMovies = renderCards(teluguData)
  }

  else{
    teluguMovies = loading();
  }

  if(hindiData?.length>0){
    hindiMovies=renderCards(hindiData)
  }

  else{
    hindiMovies=loading();
  }

  
  if(tamilData?.length>0){
    tamilMovies=renderCards(tamilData)
  }

  else{
    tamilMovies=loading();
  }

  return (
    <div className='home'>

      <p>Telugu Movies</p>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1500}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
      >
        {teluguMovies}
      </Carousel>

      <p>Hindi Movies</p>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2500}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
      >
        {hindiMovies}
      </Carousel>

      <p>Tamil Movies</p>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
      >
        {tamilMovies}
      </Carousel>

    </div>
  )
}

export default Home;