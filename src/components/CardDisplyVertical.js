import React from 'react';
import CardDisply from './CardDisplay';

const cardDisplyVertical = ({ question }) => {
	console.log(question);
	let bodyComponent = null;

	if (question) {
		bodyComponent = Object.keys(question).map((key, index) => {
			console.log(question[key].optionOne.text);
			return (
				<CardDisply
					key={index}
					option1Text={question[key].optionOne.text}
					option2Text={question[key].optionTwo.text}
				/>
			);
		});
	}
	return <div>{bodyComponent}</div>;
};

export default cardDisplyVertical;
