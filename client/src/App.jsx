import { React, useState } from 'react'
import axios from 'axios';
function App() {

  const [post, setPost] = useState({
    title: '',
    photo: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', post.photo)
    const res = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='title'
        onChange={e => setPost({ ...post, title: e.target.value })}
      />
      <input type="file" name="photo" id="photo"
        onChange={e => setPost({ ...post, photo: e.target.files[0] })}
      />
      <button>
        upload
      </button>
    </form>
  )
}

export default App