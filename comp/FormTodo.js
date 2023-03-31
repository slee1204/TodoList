"use client";

import TodoInput from './TodoInput';

export default function FormTodo() {
  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData();


  }
  return (
  <>
      <div className="center">

<form onSubmit={handleSubmit} className="form">
  <div className="inner-box">
    <label className="label">Todo</label>
    <TodoInput />
  </div>

  <div className="inner-box">
    <label className="label">Todo</label>
    <TodoInput type='date' />
  </div>

  <div className="inner-box">
    <label className="label">Todo</label>
    <TodoInput type='time'/>
  </div>

  <div className="buttonCont">
    <button className="button" type="submit">Add</button>
  </div>

</form>

</div>
  </>
 )
}