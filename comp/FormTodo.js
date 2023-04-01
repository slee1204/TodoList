
import axios from 'axios';
// import TodoInput from './TodoInput';
import {useState, useEffect} from 'react';

export default function FormTodo(props) {

  const [todo, setTodo] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [posts, setPosts] = useState(props.posts)
  
  // const addTodo = (e) => setTodo(e.target.value);
  // const addDate = (e) => setDate(e.target.value);
  // const addTime = (e) => setTime(e.target.value);

  useEffect(()=>{
    setPosts(props.posts)
  },[props.posts])
  const handleSubmit = async (e) => {
    
      e.preventDefault();
      const {data}  = await axios.post('/api/posts', {
        todo,
        date,
        time,
      })
      console.log(data)
  }

  
  return (
  <>
    <div>

      <form onSubmit={handleSubmit} className="form">
        <div >
          <label >Todo</label>
          <input 
            type="text" 
            value={todo} 
            onChange={(e) => setTodo(e.target.value)} 
          />
        </div>

        <div >
          <label >Date</label>
          <input 
            type="text" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            // addDate={addDate}
          />
        </div>

        <div >
          <label >Time</label>
          <input 
            type="text" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            // addTime={addTime}
          />
        </div>

        <div >
          <button type="submit">Add</button>
        </div>

      </form>

    </div>
  </>
  )
  }