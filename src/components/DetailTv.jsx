import React from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useState,useEffect} from "react";

const DetailTv = () => {

    const id=useParams();

    const [data,Setdata]=useState([]);

    const [crew,Setcrew]=useState([]);
    const [cast,Setcast]=useState([]);

    useEffect(()=>{
        const getTv=async()=>{
            const resp= await axios.post("http://localhost:5000/getTvDetail",{
                id:id.id
            })
            Setdata(resp.data.Movies);

            const resp1=await axios.post("http://localhost:5000/getTvCrew",{
                id:id.id
            })
            Setcrew(resp1.data.Movies.crew);
            Setcast(resp1.data.Movies.cast);
        }
        getTv()
    },[])

    let rendercrew="";
        if(crew){
            rendercrew= crew?.map((crew,i)=>{
            if(crew.profile_path){
                return <div key={i} to={`/detailcrew/${crew.id}`}>
                <img src={`https://image.tmdb.org/t/p/w154${crew.profile_path}`} alt="" className='pic'/>
            </div>
            }
            else{
                return null;
            }
            })
        }
        
        else{
            rendercrew="";
        }

        let rendercast="";
        if(cast){
            rendercast= cast?.map((crew,i)=>{
            if(crew.profile_path){
                return <div key={i} to={`/detailcrew/${crew.id}`}>
                <img src={`https://image.tmdb.org/t/p/w154${crew.profile_path}`} alt="" className='pic'/>
            </div>
            }
            else{
                return null;
            }
            })
        }
        
        else{
            rendercrew="";
        }



    const render=<div className='box'>
        <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt="" />
        <div>
        <p><strong>Name:- </strong>{data.original_name}</p>
        <p><strong>Overview :-</strong>{data.overview}</p>
        <p><strong>First Air Date :-</strong>{data.first_air_date}</p>
        </div>
    </div>
    return (
    <div className='detailtv'>
            <div>
                {render}
            </div>
            <p>Cast are :</p>
            <div>
                {rendercast}
            </div>
            <p>Crew are :</p>
            <div>
                {rendercrew}
            </div>
    </div>
    )
}

export default DetailTv