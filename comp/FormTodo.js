
import axios from 'axios';
// import TodoInput from './TodoInput';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function FormTodo(props) {

  const router = useRouter();

  const [category, setCategory] = useState("")
  const [todo, setTodo] = useState(props.todos)
  
  useEffect(()=>{
    setTodo(props.todos)
  },[props.todos])
  
  const handleSubmit = async (e) => {
    
      e.preventDefault();
      const {data}  = await axios.post('/api/todos', {
        category
      })
      console.log(data)
      // setClear()
      router.push('/profile')
  }

  
  return (
  <>
    <div>

      <form onSubmit={handleSubmit} className="form">
        <div >
          <label >What kind of Todo is it?</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          />
        </div>

        <div >
          <button type="submit">Add into your Todo Lists</button>
        </div>

      </form>

    </div>
  </>
  )
  }