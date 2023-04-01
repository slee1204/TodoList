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