import React from "react"
import Chart from "./components/Chart"

function Dashboard(props) {
    const scoreboards = props.answers.map((player,index) => <Chart key={index} data={Object.values(player)} player={Object.keys(player)} />)
    return(
        <div>
            <div className= "quality-board-wrap">
                <p className = "quality-board title">Trait Board</p>
            </div>
            <div className="scoreboard-wrap">
                {scoreboards}
            </div>
        
        
        </div>
    )
}

export default Dashboard