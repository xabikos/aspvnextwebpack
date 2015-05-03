let loremHipsum = require('lorem-hipsum');

let Lorem = {
	addText(count, loremTextElement, loremValidationElement) {
		  let loremText = '';
     	let validationText = '';
   
      if (isNaN(count) || count < 1 || count > 100) {
        loremValidationElement.html('Invalid input');
      } else {
        loremTextElement.html(loremHipsum({
  			  count: count,
  			  units: 'sentences'
		    }));
      }      
	}
};

module.exports = Lorem;