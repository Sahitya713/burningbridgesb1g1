import React, {Component} from "react"
import Navbar from "./Navbar"
import Dashboard from "./MianPages/Dashboard"
import Addqn from "./MianPages/Addqn"
import Startgame from "./MianPages/Startgame"
// import "./assets/style.css"
import fire from "./fire"
import Login from "./Login"
import Insufficient from "./MianPages/Insufficient"
// import * as Firebase from "firebase";
import Noresults from "./MianPages/Noresults"

class App extends Component {
    constructor(){
        super()

        this.state = {
            navStatus: [0,1,1],
            page: "home",
            questions: [],
            user:null,
            answers: [],
            player: null,
            options: [],
            traits: [],
            qualities: []
        }
    }
    // firebase functions
    componentDidMount = () => {
        var optionsRef = fire.database().ref('/options/')
        optionsRef.once('value', snapshot => {
            this.setState({options: snapshot.val()})
        })
        var qualitiesRef = fire.database().ref('/qualities/')
        qualitiesRef.once('value', snapshot => {
            this.setState({qualities: snapshot.val()})
        })
        this.authListener()
        this.getAnswers()
    }
    // componentDidMount() {
        
    // }
    getQuestions = () => {
        var questionsRef = fire.database().ref('/questions/')
        return questionsRef.once('value', snapshot => {
            if (snapshot.val() != null){
                let x = Object.values(snapshot.val())
                let y = []
                for (var i = 0; i <x.length; i++) {
                    if (x[i].done.includes(this.state.user.email) || x[i].done === this.state.user.email) y.push(i);}
                for (var j = y.length -1; j > -1; j--) {
                    x.splice(y[j],1)}
                if (x.length > 9) {
                    let final = []
                    let index = []
                    let randNo
                    var a = 0
                    while (a < 10) {
                        randNo = Math.floor(x.length * Math.random())
                        if (!index.includes(randNo)){
                            index.push(randNo);
                            final.push(x[randNo]);
                            a++;
                        }
                        }
                    this.setState({questions: final})
                } else {
                    this.setState({questions: [{err: "insufficient"}]})
                }
            }
          });
        
    }

    getAnswers = () => {
        var answersRef = fire.database().ref('/answers/')
        return answersRef.orderByValue().once('value', snapshot => {
            if (!snapshot.val()) {this.setState({answers:[-1]})}
            else {
                snapshot.forEach(childSnapshot => {
                    let values = Object.values(childSnapshot.val()).sort((a,b)=>b-a)
                    let keys = []
                    let x
                    let copy = childSnapshot.val()
                    function getKeyByValue(object, value) {
                            return Object.keys(object).find(key => object[key] === value)}
                    for (var i = 0; i<values.length; i++){
                        x = getKeyByValue(copy,values[i])
                        delete copy[x];
                        keys.push(x)
                    }
                    let item = {}
                    item = {[childSnapshot.key]: {qualities: keys, qualitylvls: values}}
                    let answer = this.state.answers
                    answer.push(item)
                    this.setState({answers:answer})
                    })
                }
            
            })
    }

    updatedone = (props) =>{
        // this.setState({player: props.player})
        var questionsRef = fire.database().ref('/questions/')
        return questionsRef.orderByChild('question').equalTo(props.question).once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var childKey = childSnapshot.key;
                let answer = {done: childSnapshot.val().done +" " + this.state.user.email}
                fire.database().ref().child('questions').child(childKey).update(answer);
          });
    })}
    addQn = (obj) => {
        var newPostKey = fire.database().ref().child('questions').push().key;
        var updates = {};
        updates['/questions/' + newPostKey] = obj;
        fire.database().ref().update(updates);
    }

    addAns = (props) => {
        this.setState({player: props.player})
        var answersRef = fire.database().ref('/answers/'+props.player+ '/' + props.quality)
        return answersRef.once('value', snapshot => {
            let answer
            if (snapshot.val() === null) {
                answer = {[props.quality]: parseInt(props.qualitylvl,10)}
            }
            else {answer = {[props.quality]: parseInt(props.qualitylvl,10) + parseInt(snapshot.val(),10)}}
            fire.database().ref().child('answers').child(props.player).update(answer);
          });
    }
    

    authListener() {
        fire.auth().onAuthStateChanged((user)=>{
            if(user) {
                this.setState({ user });
            } else {
                this.setState({user: null});
            }
        })
    }
    logout = () => {
        fire.auth().signOut();
    }
    
    mainClick = (event) => {
        
        let status
        const {name} =event.target
        if (name === "addqn") {status= [1,1,0]} 
        if (name === "startgame") {
            this.setState({questions: []})
            this.getQuestions()
            status = [1,0,1]}
        if (name === "home") {
            this.setState({answers: []})
            this.getAnswers()
            status = [0,1,1]}
        this.setState({navStatus: status, page: name})
    }
    render() {
        return(
            <div>
                {this.state.user ? (<div>
                    <Navbar 
                        mainClick={this.mainClick.bind(this)}
                        status={this.state.navStatus}
                        logout={this.logout}
                        user = {this.state.user}
                    />
                    {this.state.page === "home" && this.state.answers.length>0 && this.state.answers[0] !== -1 && <Dashboard answers={this.state.answers}/>}
                    {this.state.page === "home" && this.state.answers[0] === -1 && <Noresults />}
                    {this.state.page === "addqn" && this.state.qualities !== [] && <Addqn addQn={this.addQn} qualities={this.state.qualities} />}
                    {this.state.page === "startgame" && this.state.questions.length>9 && this.state.options.length > 0 && 
                        <Startgame mainClick={this.mainClick} 
                            questions={this.state.questions}
                            addAns={this.addAns}
                            updatedone={this.updatedone}
                            options = {this.state.options}
                            />}
                    {this.state.page === "startgame" && this.state.questions.length === 1 && 
                        <Insufficient />}
                    </div>) : (<Login />)}
            </div>
        )
    }
}





export default App