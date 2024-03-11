import React, { useEffect, useState } from 'react';
import { storage } from '../config/firebase';
import {ref, uploadBytes,listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
const imageListRef = ref(storage,"images/")
function Storage() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([])
    const uploadImage =()=>{
        if(imageUpload==null) return;
        const imageRef = ref(storage,`images/${imageUpload.name+ v4()}`);
        uploadBytes(imageRef,imageUpload).then(()=>{
            alert("Image Uploaded");
        })

    }
    useEffect(() => {
        listAll(imageListRef).then((response)=>{
            // console.log(response);
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                })
            })
        })
    }, []);
  return (
    <div>
      <h1>Upload images on firebase and display on frontEnd</h1>
      <div>
        <input type="file" onChange={(e)=>setImageUpload(e.target.files[0])} />
        <button onClick={uploadImage}>Upload Image</button>
        <br/> <br/>
        {imageList.map((url)=>{
            return <img src={url}  width={200} height={300}/>
        })}
      </div>
    </div>
  )
}

export default Storage
