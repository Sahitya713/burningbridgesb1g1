import React from "react"

function Endgame(props) {
    return(
        <div>
            <h1 className = "end">You have come to the end of the game.</h1>
            <button className="score" name="home" onClick={props.mainClick}>See Traits</button>
            <button className="restart" name="startgame" onClick={props.reset}>Play Again!</button>
        </div>
        
    )
}

export default Endgame