import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export default function UploadPage(){
  const [files, setFiles] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const saved = localStorage.getItem('gkonopkaart_gallery');
    if(saved) setGallery(JSON.parse(saved));
  },[]);

  useEffect(()=>{
    localStorage.setItem('gkonopkaart_gallery', JSON.stringify(gallery));
  },[gallery]);

  const onFiles = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  };

  const uploadAll = async () => {
    if(!CLOUD_NAME || !UPLOAD_PRESET){
      alert('Cloudinary not configured. Please set REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in your .env');
      return;
    }
    if(files.length===0) return;
    setLoading(true);
    for(const file of files){
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      try{
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData, {
          headers: {'X-Requested-With':'XMLHttpRequest'}
        });
        if(res && res.data && res.data.secure_url){
          setGallery(prev => [res.data.secure_url, ...prev]);
        }
      }catch(err){
        console.error('Upload error', err);
        alert('Upload failed. See console.');
      }
    }
    setFiles([]);
    setLoading(false);
  };

  const removeImage = (idx) => {
    const copy = [...gallery];
    copy.splice(idx,1);
    setGallery(copy);
  };

  return (
    <div>
      <h3>Upload artworks</h3>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <input type="file" accept="image/*" multiple onChange={onFiles} />
        <button onClick={uploadAll} disabled={loading || files.length===0}>{loading ? 'Uploading...' : 'Upload'}</button>
      </div>

      <div style={{marginTop:18}}>
        <h4>Gallery preview</h4>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12}}>
          {gallery.map((src, idx) => (
            <div key={idx} style={{position:'relative', borderRadius:8, overflow:'hidden'}}>
              <img src={src} alt={`art-${idx}`} style={{width:'100%', height:140, objectFit:'cover'}} />
              <button onClick={()=>removeImage(idx)} style={{position:'absolute', top:8, right:8}}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
