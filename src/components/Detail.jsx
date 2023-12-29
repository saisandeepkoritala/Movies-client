import { useParams,Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import {RotatingLines} from "react-loader-spinner"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Detail = () => {

  const MovieId=useParams();
  const navigate=useNavigate();

  const[data,Setdata]=useState([]);
  const[crew,Setcrew]=useState([]);
  const[cast,Setcast]=useState([]);
  const[pics,Setpics]=useState([]);
  const[pics1,Setpics1]=useState([]);

  let render;
  let rendercast;
  let rendercrew;
  let renderpics="";
  let renderpics1="";

  useEffect(()=>{

    const getData=async()=>{

      const fectheddata = await axios.post("https://mern-movies-app.onrender.com/getDetails",{
        id:MovieId.id
      })
      Setdata(fectheddata.data?.Movies)

      const creditdata= await axios.post("https://mern-movies-app.onrender.com/getCredits",{
        id:MovieId.id
      })

      Setcast(creditdata.data?.Movies?.cast)
      Setcrew(creditdata.data?.Movies?.crew)

      const picsdata= await axios.post("https://mern-movies-app.onrender.com/getPics",{
        id:MovieId.id
      })
      Setpics([...picsdata.data?.Movies?.posters])
      Setpics1([...picsdata.data?.Movies?.backdrops])
    }
    getData()

  },[MovieId])

  const loading=()=>{
    return <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
  />
  }

  if(data){
    console.log(data)
    render=
      <div className='card'>
        <img
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path}`}
          alt=""
          className='pic'
        />
        <div>
          <p><strong>Title :- </strong>{data.title}</p>
          <p><strong>Movie Plot :- </strong>{data.overview}</p>
          <p><strong>Release Date :- </strong>{data.release_date}</p>
          <p className="link" onClick={()=>navigate(`/movievideo/${data.id}`)}>
            <strong>Click here for Videos</strong></p>
        </div>
      </div>
  }

  else{
    render=loading();
  }

  if(cast){
    rendercast= cast?.map((cast,i)=>{
      if(cast.profile_path){
        return <Link key={i} to={`/detailcrew/${cast.id}`}>
          <img src={`https://image.tmdb.org/t/p/w154${cast.profile_path}`} alt="" className='pic'/>
      </Link>
      }
      else{
        return null;
      }
    })
  }

  else{
    rendercast=loading();
  }

  if(crew){
    rendercrew= crew?.map((crew,i)=>{
      if(crew.profile_path){
        return <Link key={i} to={`/detailcrew/${crew.id}`}>
          <img src={`https://image.tmdb.org/t/p/w154${crew.profile_path}`} alt="" className='pic'/>
      </Link>
      }
      else{
        return null;
      }
    })
  }

  else{
    rendercrew=loading();
  }

  if(pics){
    renderpics=pics.map((item,i)=>{
      return <div key={i}>
          <img src={`https://image.tmdb.org/t/p/original${item.file_path}`} alt="" className='pic'/>
      </div>
    })
  }

  else{
    renderpics=loading()
  }

  if(pics1){
    renderpics1=pics1.map((item,i)=>{
      return <div key={i}>
          <img src={`https://image.tmdb.org/t/p/original${item.file_path}`} alt="" className='pic'/>
      </div>
    })
  }

  else{
    renderpics1=loading()
  }

  
  return (
    <div className='detail'>
      {render}
      <p>Movie Cast are : </p>
      <div className='cast'>
        {rendercast}
      </div>
      <p>Movie Crew are : </p>
      <div className='crew'>
        {rendercrew}
      </div>
      <p>Movie Pics : </p>
      <div className='snaps'>
        {renderpics}
      </div>
      <p>Other Snaps :</p>
      <div className='snaps'>
        {renderpics1}
      </div>
    </div>
  )
}

export default Detail;