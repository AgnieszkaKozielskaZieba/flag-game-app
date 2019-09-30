import React, { Component } from "react";

class GuessForm extends Component {
	static defaultProps = {
		countriesToGuess: [],
		handleSubmit(e) {}
	};

	render() {
		var selectedCountry = "";
		var { countriesToGuess } = this.props;
		let countriesInput = countriesToGuess.map((c, i) => {
			return (
				<div key={i}>
					<input
						type="radio"
						id={c.name}
						name="countriesInput"
						value={c.name}
						onChange={e => (selectedCountry = e.target.value)}
					/>
					<label htmlFor={c.name}>{c.name}</label>
				</div>
			);
		});
		return (
			<form
				className="GuessForm"
				onSubmit={e => {
					e.preventDefault();
					this.props.handleSubmit(selectedCountry);
				}}
			>
				{countriesInput}
				<button type="submit">GUESS</button>
			</form>
		);
	}
}
export default GuessForm;
