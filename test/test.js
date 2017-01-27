let options1 = {
	functions: (new Array(10000)).fill(1).map(function(e, i) { return console.log.bind(_, i) }),
	delay: 100
};

let ass1 = new Ass(options1);
console.log(ass1.getStatus());
console.log(ass1.start());
console.log(ass1.getStatus());


let errors = [],
	options2 = {
		functions: (new Array(10000)).fill(1).map(function(e, i) { return function () { throw new Error(i) } }),
		delay: 100,
		ignoreErros: true,
		errors: errors
	};

let ass2 = new Ass(options1);
console.log(ass2.getStatus());
console.log(ass2.start());
console.log(ass2.getStatus());
console.log(errors);
console.log(ass2.getErrors());