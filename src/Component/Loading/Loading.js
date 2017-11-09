import React from 'react'
import Loading_css from './Loading.css'

class Loading extends React.Component {
	render(){
		return(
			<div className={Loading_css.loading_wrapper}>
				<svg className={Loading_css.goo_container} version="1.1" xmlns="http://www.w3.org/2000/svg">
				    <defs>
				        <filter id="goo">
				            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
				            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"></feColorMatrix>
				        </filter>
				    </defs>
				</svg>
				
				<div className={[Loading_css.loader, Loading_css[this.props.hidden]].join(' ')}>
				  	<div className={Loading_css.wrapper}>
				      <div className={Loading_css.container}>
				        <div className={[Loading_css.dot, Loading_css.dot_1].join(' ')}></div>
				        <div className={[Loading_css.dot, Loading_css.dot_2].join(' ')}></div>
				        <div className={[Loading_css.dot, Loading_css.dot_3].join(' ')}></div>
				        <div className={[Loading_css.dot, Loading_css.dot_4].join(' ')}></div>
				      </div>
				    </div>
				</div>
			</div>
		)
	}
}

export default Loading;