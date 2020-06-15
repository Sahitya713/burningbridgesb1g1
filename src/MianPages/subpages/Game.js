import React,{useState} from "react"

function Game(props) {
    const [options, setOptions] = useState(props.data.options)
    // const [selected, setSelected] = useState([])
    const [chosen, setChosen] = useState("")

    const {qnno, questions} = props.data 
    const qn = questions[qnno-1].question
    const quality = questions[qnno-1].quality
    const qualitylvl = questions[qnno-1].qualitylvl

    const buttons = options.map(option => 
        <button className="options" key={option} id={option} name={option} style= {{background: option===chosen && "#F6511d"}}
            onClick={()=>{
                // document.getElementById(option).disabled = true;
                // let b = options.indexOf(option)
                // let a = options.slice(0)
                // let b = a.indexOf(option)
                // a.splice(b,1)
                // setSelected(a)
                setChosen(option)}}
                >{option}</button>)
    const width = (60 * qnno).toString()
    return(
        <div>
            <div className="qn-status-wrap">
                <div className="qn-status" style={{width: width + "px"}}></div>
                <span className="status">Question {qnno} of 10</span>
            </div>
            <h1 className = "qn">{qn}</h1> 
            <div className = "options-wrap">
                {buttons}
            </div>
            
            <br />
            <button className="next" onClick={()=>
                {setOptions(props.data.options); 
                // document.getElementById(chosen).disabled = false; 
                // setSelected([]);
                chosen !== "" && props.addAns({player:chosen, quality:quality, qualitylvl:qualitylvl}); 
                chosen !== "" && props.updatedone({question:qn});
                setChosen("");
                props.next();} }>next</button>
        </div>
       
    )
}

export default Game