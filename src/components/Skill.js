import React from 'react'

const Skill = ({skill, exp}) => {
  return (
    <div>
        <h3>{skill}</h3>
        <div className='w-25 border border-primary mx-5 my-3'>
            <p>EXP: {exp}</p>
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                    <span className="sr-only">....35%...</span>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Skill