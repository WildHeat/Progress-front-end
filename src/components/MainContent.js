import React from 'react'
import QuoteOfTheDay from './QuoteOfTheDay'
import Tips from './Tips'

const MainContent = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-7"><QuoteOfTheDay/></div>
            <div className="col-5"><Tips/></div>
        </div>  
    
    </div>
    )
}

export default MainContent