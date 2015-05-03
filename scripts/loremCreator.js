let lorem = require('lorem-hipsum');

let loremCreator = {
	addText(count, loremTextElement, loremValidationElement) {
		let loremText = '';
       	let validationText = '';
   
       if (isNaN(count) || count < 1 || count > 100) {
          loremValidationElement.text = 'Invalid input';
      } else {
          loremTextElement = lorem({
			  count: count,
			  units: 'sentences'
		  });
      }      
	}
};

module.exports = loremCreator;