import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  //retrive food
  const [data,setData] = useState([])
  useEffect(()=>{
     axios.get(`http://localhost:5000/get`)
     .then(res=>{
        setData(res.data.Result)
     })
     .catch(err=>console.log(err))
  },[])

 
  //add food
  const [value, setValue] = useState({
    foodname: ``,
    description: ``,
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:5000/insert`, value)
      .then(() => console.log(`Successfully sent`))
      .catch((err) => console.log(err))

    setValue({
      ...value,
      foodName: ``,
      description: ``
    })
  }

  //update
  const [update,setUpdate] = useState({
    id:``,
    name:``,
  })
    const handleUpdate=(e)=>{
      const id=update.id
      axios.put(`http://localhost:5000/update/`+id,update)
      .then(()=>{
        console.log(`success`)
      })
      .catch(err=>console.log(err))
     
      setUpdate({
        id:``,
        name:``
      })
    }
    //delete
    const deleteFood=(id)=>{
      axios.delete(`http://localhost:5000/delete/`+id)
      .then(res=>{
        if(res.data.Status === `Success`){
          window.location.reload();
        }
      })
      .catch(err=>console.log(err))
    }
  return (
    <div>
      <div className="container w-50">
        <h3>Food</h3>
        <form onSubmit={handleSubmit}>
          <div className='d-flex flex-column justify-content-center align-item-center'>
            <div className='form-group'>
              <label htmlFor="" className="form-label">Food Name:</label>
              <input type="text" className="form-control" value={value.foodName} placeholder='food name' onChange={e => setValue({...value, foodName: e.target.value })} />
            </div>

            <div className='form-group'>
              <label htmlFor="" className="form-label">Description</label>
              <input type="text" className="form-control" value={value.description} placeholder='food-description' onChange={e => setValue({...value, description: e.target.value })} />
            </div>
          </div>
          <button className="btn  w-100 mt-3 btn-success" type='submit'>Submit</button>
        </form>
      </div>

      <div className="container mt-3 w-50">
        <table className="table table-striped text-center">
          <thead className='bg-dark text-white pb-5'>
            <th>Food Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {data.map((result)=>{
              return(
               <tr>
                <td>{result.foodName}</td>
                <td>{result.description}</td>
                <td>
                  <form onSubmit={handleUpdate} className='d-flex'>
                  <input type="text" className="form-control me-2 shadow" onChange={e=>setUpdate({...update,name:e.target.value})}  placeholder='Change Name'/>
                  <button className="btn btn-primary" type='sub' onClick={()=>setUpdate({...update,id:result._id})}>Update</button>
                  </form>
                  </td>
                 <td><button className="btn btn-danger" onClick={()=>deleteFood(result._id)}>Delete</button></td>
               </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
