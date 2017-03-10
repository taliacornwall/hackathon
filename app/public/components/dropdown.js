import React from 'react';
import ReactDOM from 'react-dom';
import countryCodes from '../countryCodes';

const codes = countryCodes.map(function(elm){
	return {"code": elm.Code, "name": elm.Name};
});

class Dropdown extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: "All",
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(key){
		this.setState({
			selected: key
		});
	}

	render() {
		return (
			<div class="btn-group" id="countryDropdown">
				<div className="dropdown">
				  <button className="btn btn-default dropdown-toggle" 
				  				type="button" 
				  				id="dropdownMenu1" 
				  				data-toggle="dropdown" 
				  				aria-haspopup="true" 
				  				aria-expanded="true">
				    <span id="selected">{this.state.selected}</span>
				    <span className="caret"></span>
				  </button>
				  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				   {codes.map((code) => {
			          return <li key={code.code}><a onClick={this.handleClick.bind(this, code.code)}>{code.name}</a></li>;
			      })}
				  </ul>
				</div>
			</div>
		);
	}
}

const dropdown = <Dropdown/>;
ReactDOM.render(
	dropdown,
  document.getElementById('root')
);

