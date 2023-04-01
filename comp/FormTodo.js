<<<<<<< HEAD

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
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            // addDate={addDate}
          />
        </div>

        <div >
          <label >Desc</label>
          <input 
            type="time" 
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
=======
"use client";
import axios from 'axios';
import TodoInput from './TodoInput';

export default function FormTodo() {
  
  async function handleSubmit (e) {
    
      e.preventDefault();
      const formData = new FormData(e.target);
  
      const res = await fetch('api/todos', {
        method: 'POST',
        body: JSON.stringify({
          todo: formData.get('todo'),
          date: formData.get('date'),
          time: formData.get('time')
        })
      });
  
      // const data = res;
      console.log(res);
      e.target.reset();
    
  }
  return (
  <>
      <div className="center">

<form onSubmit={handleSubmit} className="form">
  <div className="inner-box">
    <label className="label">Todo</label>
    <TodoInput name = "todo"/>
  </div>

  <div className="inner-box">
    <label className="label">Todo</label>
    <TodoInput name="date" type='date' />
  </div>

  <div className="inner-box">
    <label className="label">Todo</label>
    <TodoInput name="time" type='time'/>
  </div>

  <div className="buttonCont">
    <button className="button" type="submit">Add</button>
  </div>

</form>

</div>
  </>
  )
}
>>>>>>> main/main
