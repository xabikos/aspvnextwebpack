import loremHipsum from 'lorem-hipsum';

let Lorem = {
	addText(count, loremTextElement, loremValidationElement) {
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

export default Lorem;