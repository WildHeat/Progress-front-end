import React, { useState } from 'react'
import Skill from './Skill'
import AddSkillButtton from './AddSkillButtton'

const AllSkills = (user) => {
  const [skills, setSkills] = useState();

  function displaySkills(){
    var listOfSkills = []
    for (let i=0; i<user.user.skills.length; i++){
      listOfSkills.push(<Skill skill={user.user.skills[i].name} exp={user.user.skills[i].exp} key={i}/>)
      console.log("Name of skill: "+ user.user.skills[i].name + "\nExp: " + user.user.skills[i].exp)
    }
    return listOfSkills;
  }
  

  return (
    <>{displaySkills()}</>
    )
  }
  
  // <div className='container'>

  //     <div className="row">
  //         <div className="col"><Skill skill={user.user.skills[0].name} exp={user.user.skills[0].exp} /> </div>
  //         <div className="col"><Skill skill="React" exp="20" /> </div>
  //     </div>
  //     <div className="row">
  //         <div className="col"><Skill skill="Java" exp="20" /> </div>
  //         <div className="col"><Skill skill="SQL" exp="20" /> </div>
  //     </div>
  //     <div className="row">
  //         <div className="col"><Skill skill="Spring" exp="20" /> </div>
  //         <div className="col"><AddSkillButtton/> </div>
  //     </div>
  // </div>

export default AllSkills