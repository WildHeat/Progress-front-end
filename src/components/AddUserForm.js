import React, { useState } from 'react'
// import Axios from 'axios'

function AddUserForm() {
    // const url = "/api/v1/users";
    const [data, setData] = useState({
        username: "",
        skill: ""
    })

    function getTodaysDate(){
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate.toISOString().split('T')[0]
    }

    function handleSubmit(e){
        e.preventDefault();
        window.location.replace("/");
        fetch("/api/v1/users", {
            "headers" : {
              "Content-type" : "application/json"
            },
            "method" : "post",
            "body" : JSON.stringify({"username": data.username, "userJoinDate" : getTodaysDate(),"skills": [{"name" : data.skill}]})
        })
    }

    function handleChange(e){
        // console.log(data)
        const newData = {"username": data.username, "skill" : data.skill}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(JSON.stringify({"username": data.username, "userJoinDate" : getTodaysDate(),"skills": [{"name" : data.skill}]}))
    }

  return (
    <div>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <input onChange={(e)=>handleChange(e)} value={data.username || ""} type="text" className="form-control" id="username" placeholder="Enter Username..."/>
            <input onChange={(e)=>handleChange(e)} value={data.skill || ""} type="text" className="form-control" id="skill" placeholder="Enter First Skill..."/>
            <input type='submit' value="Start Your Journey"/>
        </form>
    </div>
  )
}

export default AddUserForm