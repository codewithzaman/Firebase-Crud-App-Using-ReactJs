import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs,collection,addDoc,deleteDoc,doc,updateDoc } from 'firebase/firestore';

function Movies() {
    const [movieList, setMovieList] = useState([]);
    // new movie states
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
    // Update Title State
    const [updatedtitle, setUpdatedtitle] = useState('')
    const movieCollectionRef = collection(db,"movies");
    const getMovieList = async ()=>{
        try {
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
        }))
        console.log(filteredData);
         setMovieList(filteredData)
} catch (error) {
    console.error(error);
}
}
  useEffect(() => {
    getMovieList();
  }, []) 
  // Create new movie
  const onSubmitMovie = async()=>{
    try{ await addDoc(movieCollectionRef,{
        title:newMovieTitle,
        releaseDate:newReleaseDate,
        receivedAnOscar:isNewMovieOscar,
    });
    getMovieList();
} catch(err){
    console.error(err);
}};
// Delete Movie
const deletMovie = async(id)=>{
const movieDoc = doc(db,"movies",id);
await deleteDoc(movieDoc);
getMovieList();
}
// Update Movie Title
const updateMovieTitle = async(id)=>{
const movieDoc = doc(db,"movies",id);
await updateDoc(movieDoc,{title:updatedtitle});
getMovieList();
setUpdatedtitle('');
}
  return (
    <div>
      <h1>List of Movies</h1>
      <br/>
        <br/>
      <div>
        <input type="text" placeholder='Movie title...' 
        onChange={(e)=>setNewMovieTitle(e.target.value)} />
        <input type="number" placeholder='Release date...'
        onChange={(e)=>setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" 
        checked={isNewMovieOscar}
        onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie)=>(
            <div>
                <h1 style={{color: movie.receivedAnOscar?"green":"red"}}>{movie.title}</h1>
                <p>{movie.releaseDate}</p>
                <button onClick={()=>deletMovie(movie.id)}>Delete Movie</button><br/> <br/>
                <input type="text" placeholder='New Title...'
                onChange={(e)=>setUpdatedtitle(e.target.value)}  />
                <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Movies
