import React, { useEffect, useState } from 'react'
import {EmployeeData} from './EmployeeData'
 
export  const App = ()=>{

  const  [data ,setData] = useState([]);
  const [firstName,setfirstName] = useState("");
  const [lastName , setlastName] = useState("");
  const [age,setAge ] = useState(0);
  const [ id , setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(()=>{
    setData(EmployeeData);
  },[])

  const handleEdit = (id)=>{
    
    const dt = data.filter((item => item.id === id ))
    if(dt !== undefined){
      setIsUpdate(true)
      setId(id)
      setfirstName(dt[0].firstName)
      setlastName(dt[0].lastName)
      setAge(dt[0].age)
    }
  }
  const handleDelete = (id)=>{
    if(id > 0 ){
      if(window.confirm("are you sure to delete this recode")){
      const dt = data.filter(item => item.id !==id)
      setData(dt); 
    }
  }
}
const handleUpdate = ()=>{

  const index = data.map((item)=>{
    return item.id;
  }).indexOf(id)
  const dt = [...data];
  dt[index].firstName=firstName;
  dt[index].lastName=lastName;
  dt[index].age=age;
  setData(dt);
  handleClear()
}
const handleSave = (e)=>{
  let error = '';
  if(firstName === '')
    error += 'first name is required '
  if(lastName === '')
    error += 'last name is required '
  if(age <= 0)
    error += 'age is required'
  if(error === ''){
e.preventDefault();
const dt = [...data];
const newObject = {
  id : EmployeeData.length+1,
  firstName : firstName,
  lastName : lastName,
  age : age
}
dt.push(newObject);
setData(dt);
}
else{
  alert(error)
}
}
const handleClear = ()=>{
  setId(0);
  setfirstName("");
  setlastName("");
  setAge(0);
  setIsUpdate(false)
}

  return <>
  <div>App 
    <div style={{display : 'flex' , justifyContent:'center ', marginTop: '10px',marginBottom:'10px'}}>
      <div>
        <label >First Name : <input type="text" placeholder='enter first Neme' value={firstName} onChange={(e)=>setfirstName(e.target.value)} /></label>
      </div>
      <div>
        <label>Last Name: <input type="text" placeholder='enter last Neme' value={lastName} onChange={(e)=>setlastName(e.target.value)} /></label>
      </div>
      <div>
        <label>Age : <input type="text" placeholder='enter age' value={age} onChange={(e)=>setAge(e.target.value)} /></label>
      </div>
      <div>
        {
          !isUpdate ? 
          <button className='btn btn-primary' onClick={(e)=>handleSave(e)} > Save</button>
          :
          <button className='btn btn-primary' onClick={()=>handleUpdate()} >Update</button>
        }
        
        
        <button className='btn btn-dark' onClick={()=>handleClear()}>Clear</button>
      </div>
    </div>
  </div>
  <table className='table table-hover'>
    <thead>
      <tr>
      <td>S No.</td>
      <td>id</td>
      <td>firstName</td>
      <td>lastName</td>
      <td>age</td>
      <td>Actions</td>
      </tr>
      </thead>
      <tbody>
        { data.map((items , index)=>{
          return <>
            <tr key={index}>
              <td>{index + 1 }</td>
              <td>{items.id}</td>
              <td>{items.firstName}</td>
              <td>{items.lastName}</td>
              <td>{items.age}</td>
              <td>
                <button className='btn btn-success' onClick={()=> handleEdit(items.id)}>Edit</button>&nbsp;
                <button className='btn btn-danger' onClick={()=> handleDelete(items.id)}>delete</button>             
              </td>
              <td>
                               
              </td>
            </tr>
          </>
        })}
      </tbody>

  </table>
  
  </>
}

