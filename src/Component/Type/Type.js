import React from 'react';
import type_css from './Type.css';

const kata = ["Selamat Datang","Benvenuto!","Willkommen","ようこそ","Welcome","Bienvenido"];
var active_word = 0;
const typo_rate = 0.2;
var typo_state = false;

class Type extends React.Component {
	constructor(props){
		super(props);
		var temp = kata;
		for(var i = 0 ; i < temp.length ; i++){
			temp[i] = temp[i].split('');
		}

		this.state = {
			word: temp,
		}
	}
	componentDidMount(){
		console.log(this.state.word);
		this.writing(this.doneHandler.bind(this));
	}
	writing(callback){
		var index = 0;
		var writing = setInterval(function(){
			if(typo_state){
				var value_com = this.refs.com.innerHTML;
				this.refs.com.innerHTML = value_com.slice(0,value_com.length-1);
				typo_state = false;
			}else{
				var random = Math.random();
				if(random < typo_rate){
					this.refs.com.innerHTML += '-';
					typo_state = true;
				}else{
					this.refs.com.innerHTML += this.state.word[active_word][index];
					index++;
					if(index >= this.state.word[active_word].length){
						clearInterval(writing);
						setTimeout(function(){
							this.clearText();
						}.bind(this),1000);
					}	
				}
			}
		}.bind(this),350);
		// console.log('1');
	}
	clearText(callback){
		var clear_word = setInterval(function(){
			this.refs.com.innerHTML = this.refs.com.innerHTML.slice(0,this.refs.com.innerHTML.length-1);
			if(this.refs.com.innerHTML.length === 0){
				clearInterval(clear_word);
				this.doneHandler();
			}
		}.bind(this),350);
		// console.log('2');
	}
	doneHandler(){

		if(active_word >= this.state.word.length-1){
			active_word = 0;
		}else {
			active_word++;
		}
		this.writing();
		// console.log('3');
	}
	render() {
		return (
			<div className={type_css.type_wrapper}>
				<span ref="com">
				</span>	
			</div>
		)
	}
}

export default Type;