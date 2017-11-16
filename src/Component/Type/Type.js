import React from 'react';
import type_css from './Type.css';

var active_word = 0;
var writing, clear_word;
var typo_state = false;
var repeat = false;

class Type extends React.Component {
	constructor(props){
		super(props);
		
		var temp = this.props.kata;

		if(temp instanceof Array){
			for(var i = 0 ; i < temp.length ; i++){
				temp[i] = temp[i].split('');
			}
			repeat = true;
		}

		this.state = {
			word: temp,
		}
	}
	componentDidMount(){
		this.writing(this.doneHandler.bind(this));
	}
	componentWillUnmount(){
		clearInterval(writing);
		clearInterval(clear_word);
	}
	writing(callback){
		var index = 0;
		writing = setInterval(function(){
			if(typo_state){
				var value_com = this.refs.com.innerHTML;
				this.refs.com.innerHTML = value_com.slice(0,value_com.length-1);
				typo_state = false;
			}else if(!repeat){
				var random = Math.random();
				if(random < this.props.typo_rate){
					this.refs.com.innerHTML += '-';
					typo_state = true;
				}else{
					this.refs.com.innerHTML += this.state.word[index];
					index++;
					if(index >= this.state.word.length){
						clearInterval(writing);
					}	
				}
			}else{
				var random = Math.random();
				if(random < this.props.typo_rate){
					this.refs.com.innerHTML += '-';
					typo_state = true;
				}else{
					this.refs.com.innerHTML += this.state.word[active_word][index];
					index++;
					if(index >= this.state.word[active_word].length){
						clearInterval(writing);
						setTimeout(function(){
							this.clearText();
						}.bind(this),this.props.waiting_time);
					}	
				}
			}
		}.bind(this),this.props.type_speed);
	}
	clearText(callback){
		clear_word = setInterval(function(){
			this.refs.com.innerHTML = this.refs.com.innerHTML.slice(0,this.refs.com.innerHTML.length-1);
			if(this.refs.com.innerHTML.length === 0){
				clearInterval(clear_word);
				this.doneHandler();
			}
		}.bind(this),this.props.type_speed);
	}
	doneHandler(){
		if(active_word >= this.state.word.length-1){
			active_word = 0;
		}else {
			active_word++;
		}
		this.writing();
	}
	render() {
		return (
			<span className={type_css.type_component} ref="com"/>	
		)
	}
}

Type.defaultProps = {
	kata: ["Selamat Datang","Benvenuto!","Willkommen","ようこそ","Welcome","Bienvenido"],
	typo_rate: 0.2,
	waiting_time: 2000,
	type_speed: 350,
}

export default Type;