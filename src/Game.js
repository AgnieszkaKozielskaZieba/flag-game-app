import React,{Component} from 'react';
import GuessForm from "./GuessForm"
import "./Game.css"

const GameState={
	ACTIVE:0,
	WON:1,
	LOST:2
}
class Game extends Component{
  constructor(props){
    super(props)
    this.state={
      countriesData:[],
      countriesToGuess:[],
      randomCountry:{name:"",flag:""},
      gameState:GameState.ACTIVE
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleNextGame=this.handleNextGame.bind(this)
  }

componentDidMount(){
fetch("https://restcountries.eu/rest/v2/all")
.then(data=>data.json())
.then(data=>this.setState({countriesData:data}))
.then(()=>{
 this.handleNextGame();
 })
}

handleNextGame(){
    var {countriesData,countriesToGuess,randomCountry}=this.state

    if(countriesData&&countriesData.length>0){
      randomCountry=countriesData[Math.floor(Math.random()*countriesData.length)]
      countriesToGuess=countriesData.sort(()=>0.5-Math.random()).slice(0,3)
      countriesToGuess.push(randomCountry)
      countriesToGuess=countriesToGuess.sort(()=>0.5-Math.random())
      let gameState=GameState.ACTIVE
      this.setState({countriesToGuess,randomCountry,gameState})
    }   
  
}

handleSubmit(selectedCountry){
	if(selectedCountry==="") return
	if(selectedCountry===this.state.randomCountry.name){
		this.setState({gameState:GameState.WON})
		return
	}
	this.setState({gameState:GameState.LOST})
}
	

  render(){
	let flagPict=<img className="flagPict" src={this.state.randomCountry.flag} alt=""/>;
	let guessForm=<GuessForm countriesToGuess={this.state.countriesToGuess}
  		handleSubmit={this.handleSubmit}/>;
  let nextButton=<button type="button" className="nextButton"
  onClick={this.handleNextGame}>NEXT</button>;
	if (this.state.gameState===GameState.WON){
		guessForm=<div className="GuessForm">
    CONGRATS!
    {nextButton}
    </div>
	}	
	if (this.state.gameState===GameState.LOST){
		guessForm=<div className="GuessForm">
    You silly! It was {this.state.randomCountry.name}
    {nextButton}
    </div>
	}
    	return(
  		<div>
  		{guessForm}
  		{flagPict}
  		</div>
  		)
  }
}

export default Game