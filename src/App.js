import { useState,useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './App.css';
import axios from 'axios';

function App() {
  const [query,setquery]=useState("mountains");
  const [val,setval]=useState('')
  const [img, setimg] = useState([]);
  
  useEffect(()=>{
    axios.
    get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=727870a127b6d4eb64711d130f2de5d7&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then((res)=>{
      console.log(res.data);
      const arr = res.data.photos.photo.map((pic) => {
        return `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
    });
    console.log(query,val)
    setimg(arr)
    console.log(img)
    }).catch((e)=>{
      console.log(e.message)
    })
  },[query])

  return (
    <div className="App">
      <div className='box'>
        <h1 style={{color:"blue"}}>Snap Shot</h1>
        <input type='text' id='text'
         onKeyUp={(e)=>setval(e.target.value)}></input>
         <button
          htmlFor='text'
          style={{marginLeft:"15px",backgroundColor:"darkblue",color:"white"}} onClick={()=>{setquery(val)}}><b>Search</b></button>
        <div className='buttons'>
        <button onClick={()=>setquery("mountains")} style={{backgroundColor:"darkblue",color:"white"}}>Mountains</button>
        <button onClick={()=>setquery("beaches")} style={{backgroundColor:"darkblue",color:"white"}}>Beaches</button>
        <button onClick={()=>setquery("birds")} style={{backgroundColor:"darkblue",color:"white"}}>Birds</button>
        <button onClick={()=>setquery("food")} style={{backgroundColor:"darkblue",color:"white"}}>Food</button>
        </div>
      </div>
      <h2>{query} pictures</h2>
      <div className='all-img'>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164} >
  {img.map((item,i) => (
    <ImageListItem key={i}>
      <img
        src={`${item}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
      </div>
    </div>
  );
}

export default App;
