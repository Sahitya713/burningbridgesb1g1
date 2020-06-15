import React, {Component} from "react"
import Game from "./subpages/Game"
import Endgame from "./subpages/Endgame"

class Startgame extends Component {
    state = {
        qnno: 0,
        options: this.props.options,
        questions:[]
    }

    componentDidMount() {
        this.setState({questions: this.props.questions})
    }

    next = () => {
        this.setState(prevState => {
            return {
                qnno: prevState.qnno + 1
            }    
        })
    }
    reset = (e) => {
        this.setState({qnno: 0})
        this.props.mainClick(e)
    }
    render() {

        return(
            <div>
                {this.state.qnno > 10 && <Endgame next={this.next} mainClick={this.props.mainClick} reset={this.reset}/>}
                {this.state.qnno === 0 && 
                    <div>
                        <div className= "quality-board-wrap">
                            <p className = "quality-board title">Quiz Rules</p>
                        </div>
                        <ol>
                            <li><span className= "rules one">Each quiz round consists of 10 questions.</span></li>
                            <li>For each question, Select the team member that best suits the question condition.</li>
                            <li>See your team members quality chart change based on the questions they were picked for.</li>
                        </ol>
                        <button className="play" onClick={this.next}>PLAY</button>
                    </div>}
                {this.state.qnno > 0 && this.state.qnno < 11 && <Game data={this.state} next={this.next} addAns={this.props.addAns} updatedone={this.props.updatedone}/> }
            </div>
        )
    }
    
}

export default Startgame