import React, {Component} from "react"

class Addqn extends Component {
    state = {
        question: "Please Enter a question",
        quality: "--please choose--",
        qualitylvl: "1",
        done: ""
    }
    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.addQn(this.state);
        this.setState({
            question: "Please Enter a question",
            quality: "--please choose--",
            qualitylvl: "1",
            done: ""
        })
    }
    
    render() {
        const qualitylvls = [1,2,3,4,5]
        const qualities = this.props.qualities
        return(
            <div> 
                <div className= "add-wrap">
                    <h1 className="add">Add a question for your team members to play.</h1>
                </div>
            <form onSubmit={this.handleSubmit} style={{marginTop:"100px"}}>
                <input className="qnInput" type="text" value={this.state.question} name="question" onChange={this.handleChange}/>
                <div className ="traits_e">Add a trait associated with the question and its weight. <br/>These will be used to calculate trait scores for the team members.</div>
                <label className = "trait_l" style={{color: "#fff"}}>Trait:</label>
                <select 
                    className = "trait"
                    value={this.state.quality}
                    onChange={this.handleChange}
                    name="quality"
                >
                    {qualities.map(choice => <option key={choice} value={choice}>{choice}</option>)}
                </select>
                
                <br />



                <label className="traitlvl_l">Trait Level:</label>
                <select 
                    className="traitlvl"
                    value={this.state.qualitylvl}
                    onChange={this.handleChange}
                    name="qualitylvl"
                    
                >
                    {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                </select>

                <button className="submit" style={{display : (this.state.question === "Please Enter a question" || this.state.quality === "--please choose--") && "none"}}>Submit</button>
            </form>
            </div>
        )
    }
    
}

export default Addqn

