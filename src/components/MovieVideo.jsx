import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import {RotatingLines} from "react-loader-spinner"
import axios from "axios";

const MovieVideo = () => {
    const Id=useParams();
    const[video,Setvideo]=useState([]);

    useEffect(()=>{
        const getVideos=async()=>{
            const resp= await axios.post("https://mern-movies-app.onrender.com/getMovieVideo",{
                id:Id.id
            })
            console.log(resp?.data?.Movies?.results)
            Setvideo(resp?.data?.Movies?.results)
        }

        getVideos();
    },[Id.id])

    const loading=()=>{
        return <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
    />
    }

    let render="";

    if(video){
        render=(
            <div className='video'>
            <h1>Note:Videos are limited</h1>
            {video.map((promotion) => (
                <div key={promotion.id} className="promotion-container">
                <h2>{promotion.name}</h2>
                <p>Type: {promotion.type}</p>
                <p>Published at: {new Date(promotion.published_at).toLocaleDateString()}</p>
                <a href={`https://www.youtube.com/watch?v=${promotion.key}`} alt="">Click here to watch on Youtube</a>
                <div className="video-container">
                    <iframe
                    title={promotion.name}
                    src={`https://www.youtube.com/embed/${promotion.key}`}
                    allowFullScreen
                    ></iframe>
                </div>
                <hr />
                </div>
            ))}
            {video.length===0 && <p>None are found unfortunately</p>}
    </div>
            );
    }
    else{
        render=loading();
    }

    return (
        <div>{render}</div>
    )
}

export default MovieVideo;