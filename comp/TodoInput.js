import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.label`
  font-weight: bold;
`
const Inputs = styled.input`
  border: none;
  border-radius: 5px;
  padding: 10px;
`


export default function TodoInput({
  type="text" ,
<<<<<<< HEAD
  value="value",
  placeholder="add your task" ,
  name="todo",
  id="todo", 
  onchange=()=>{}
=======
  placeholder="add your task" ,
  name="todo",
  id="todo" 
>>>>>>> main/main
}){
  return (
    <Inputs 
    type={type} 
    placeholder={placeholder}
    name={name} 
    id={id} 
<<<<<<< HEAD
    value={value}
    onChange={onchange}
=======
>>>>>>> main/main
  />
  )
}