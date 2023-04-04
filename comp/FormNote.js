
import axios from 'axios';
// import TodoInput from './TodoInput';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function FormNote(props) {

  const router = useRouter();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [posts, setPosts] = useState(props.posts)
  

  useEffect(()=>{
    setPosts(props.posts)
  },[props.posts])


  const handleSubmit = async (e) => {
    
      e.preventDefault();
      const {data}  = await axios.post(`/api/todos/${props.id}/notes`, {
        title,
        content,
        date,
        time,
      })
      // console.log(data)
      // setClear()
      setPosts([...posts, data])
      router.push('/profile')
  }

  
  return (
  <>
    <div>

      <form onSubmit={handleSubmit} className="form">
        <div >
          <label >Add Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div >
          <label>Add Description</label>
          <input 
            type="text" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div >
          <label >Set Date</label>
          <input 
            type="text" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        <div >
          <label >Set Time</label>
          <input 
            type="text" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
        </div>

        <div >
          <button type="submit">Update</button>
        </div>

      </form>

    </div>
  </>
  )
  }