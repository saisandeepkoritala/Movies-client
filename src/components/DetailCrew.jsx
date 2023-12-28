import{ useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

const DetailCrew = () => {
    const Id=useParams();

    const [data,Setdata]=useState([]);

    useEffect(()=>{

        const fetchInfo=async()=>{
            const response = await axios.post("http://localhost:5000/getActorInfo",{
                id:Id.id
            })
            Setdata(response.data.Movies)
        }

        fetchInfo();
    },[])

    let render="";
    if(data){
        
        let sex="";
        if(data.gender===1){
            sex="Female";
        }
        else if(data.gender===2){
            sex="Male";
        }

        render= <div className='profile'>
            <div className='pic'>
                <img src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt=""></img>
            </div>
            <div className='details'>
                <p><strong>Name :- </strong>{data.name}</p>
                <p><strong>Sex :-</strong>{sex}</p>
                <p><strong>D.O.B :-</strong>{data.birthday ||"Not Available"}</p>
                <p><strong>Place of Birth :-</strong>{data.place_of_birth ||"Not Available"}</p>
                <p><strong>About :-</strong>{data.biography ||"Not Available"}</p>
            </div>
        </div>
    }
    else{

    }
    return (
    <div className='detailcrew'>{render}</div>
    )
}

export default DetailCrew