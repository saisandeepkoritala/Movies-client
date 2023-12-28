import {useState ,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {RotatingLines} from "react-loader-spinner";

const Movies = () => {

  const [selectedOption, setSelectedOption] = useState('IN');
  const [data,Setdata]=useState([]);

  const [selectedOptionLang, setSelectedOptionLang] = useState('te');
  const [dataLang,SetdataLang]=useState([]);

  const [year,Setyear]=useState(2023);

  const[selectDate,SetselectDate]=useState(`${year}-01-01`);
  const[selectDate1,SetselectDate1]=useState(`${year}-12-31`);

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

  const handleChange = (e) => {
    const newYear = e.target.value;
    SetPage(1);
    Setyear(newYear);
  
    const newStartDate = `${newYear}-01-01`;
    const newEndDate = `${newYear}-12-31`;
    SetselectDate(newStartDate);
    SetselectDate1(newEndDate);
  };
  
  
  useEffect(()=>{
    const getLanguage=async()=>{

      const response = await axios.get("http://localhost:5000/getByCountry")
      Setdata(response?.data?.Movies)

      const responseLang = await axios.get("http://localhost:5000/getLanguage")
      SetdataLang(responseLang?.data?.Movies)

      const response1=await axios.post("http://localhost:5000/getCustomMovies",{
      year:year,
      country:selectedOption,
      language:selectedOptionLang,
      page,
      selectDate,
      selectDate1
    })
    Setmovies(response1?.data?.Movies?.results)

    }
    getLanguage();
  },[page,selectDate,selectDate1,selectedOption,selectedOptionLang,year])

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
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className='card'></img>
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

  const handleDate=(e)=>{
    SetPage(1)
    console.log(e.target.value)
    SetselectDate(e.target.value)
  }

  const handleDate1=(e)=>{
    SetPage(1)
    console.log(e.target.value)
    SetselectDate1(e.target.value)
  }

  const handleMore=async()=>{
    SetPage(page+1);
    const response=await axios.post("http://localhost:5000/getCustomMovies",{
      year:year,
      country:selectedOption,
      language:selectedOptionLang,
      page,
      selectDate,
      selectDate1
    })
    Setmovies(response?.data?.Movies?.results)
  }

  return (
    <div className='movies'>
      <div className='header'>
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
        <div>
          <label>Year</label>
            <input placeholder='enter year' value={year} onChange={handleChange} type="number"/>
        </div>
        <div>
          <label>Date Start</label>
          <input type="date" value={selectDate} onChange={handleDate}/>
        </div>
        <div>
          <label>Date End</label>
          <input type="date" value={selectDate1} onChange={handleDate1}/>
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

export default Movies