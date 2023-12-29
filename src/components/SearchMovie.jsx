import {useState ,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {RotatingLines} from "react-loader-spinner";

const SearchMovie = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [data,Setdata]=useState([]);

    const [selectedOptionLang, setSelectedOptionLang] = useState('');
    const [dataLang,SetdataLang]=useState([]);

    const[searchTerm,SetsearchTerm]=useState("oppenheimer");

    const [movies,Setmovies]=useState([]);

    const[page,SetPage]=useState(1);

    const handleSelectChange = (event) => {
        SetPage(1)
        setSelectedOption(event.target.value);
    };

    const handleSelectChangeLang = (event) => {
        SetPage(1)
        setSelectedOptionLang(event.target.value);
    };
    
    
    useEffect(()=>{

        const getLanguage=async()=>{
        
        const response = await axios.get("https://mern-movies-app.onrender.com/getByCountry")
        Setdata(response?.data?.Movies)

        const responseLang = await axios.get("https://mern-movies-app.onrender.com/getLanguage")
        SetdataLang(responseLang?.data?.Movies)

        const response1=await axios.post("https://mern-movies-app.onrender.com/getSearchMovie",{
        searchTerm,
        language:selectedOptionLang,
        page,
        country:selectedOption
        })
        Setmovies(response1?.data?.Movies?.results)

        }
        getLanguage();

    },[page,selectedOption,selectedOptionLang,searchTerm])

    let render=[];
    let renderLang=[];

    if(data && Array.isArray(data)){
        render=data?.map((i)=>{
        return <option value={`${i.iso_3166_1}`} key={`${i.iso_3166_1}`}>{i.english_name}
        </option>
        })
    }
    if(dataLang && Array.isArray(dataLang)){
        renderLang=dataLang?.map((i)=>{
        return <option value={`${i.iso_639_1}`} key={`${i.iso_639_1}`}>
            {i.english_name}
            </option>
        })
    }

    let renderMovies="";

    if(movies){
        renderMovies=movies.map((movie,i)=>{
        return <Link key={i} to={`/detail/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className='card' height="400px"></img>
            <p></p>
        </Link>
        })
    }
    else{
        renderMovies="";
    }

    const loading=()=>{
        return <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
    />
    }

    const handleMore=()=>{
        SetPage(page+1);
    }

    return (
        <div className='movies'>
        <div className='header'>
            <div>
                <label>Name </label>
                <input type="text" placeholder='enter movie..' value={searchTerm} onChange={e=>SetsearchTerm(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="dropdown">Country</label>
                <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                <option value="">-- Select --</option>
                {render}
                </select>
            </div>
            <div>
            <label htmlFor="dropdown">Language</label>
                <select id="dropdown" value={selectedOptionLang} onChange={handleSelectChangeLang}>
                <option value="">-- Select --</option>
                {renderLang}
                </select> 
            </div>
        </div>
        <div className='data'>
            {renderMovies || loading()}
        </div>
        <div onClick={handleMore}>
            <p>See More</p>
        </div>
        </div>
    )
}

export default SearchMovie;