/**
 * Working with an array of functions to be executed
 * @param {Object} options
 * @param {function[]} options.functions
 * @param {(number|number[])} options.delay
 * @param {bool} options.ignoreErrors
 * @param {[]} options.errors - optional array to return errors in case of options.ignoreErrors is true
 */
_ = undefined;
Ass = (function () {
	let ass = function (options) {
		let fns = options.functions.slice(),
			delay = Array.isArray(options.delay) ? options.delay.slice() : options.delay,
			ignoreErrors = !!options.ignoreErrors,
			errors = options.errors && Array.isArray(options.errors) ? options.errors : [],
			tryCall_ = _tryCall.bind(_, ignoreErrors, errors);

		this.getErrors = function () {
			return errors.slice();
		};

		this.start = function () {
			_callFunctions(delay, fns, tryCall_);
		};

		this.getStatus = function () {
			if (options.functions.length == fns.length)
				return 'not started';

			let returnS = '';

			if (options.functions.length != fns.length)
				returnS += 'running';
			else if (!fns.length)
				returnS += 'concluded';

			if (errors.length)
				returnS += ' with errors';

			return returnS;
		};
	};

	let _callFunctions = function (delay, fns, tryCall) {
		let terminate,
			getDelay;
		if (Array.isArray(delay)) {
			terminate = function () {
				return !!(fns.length && delay.length);
			};
			getDelay = function () {
				return delay.shift();
			};
		}
		else if (typeof delay == 'number') {
			terminate = function () {
				return !!fns.length;
			};
			getDelay = function () {
				return delay;
			};
		}

		let callFunctions_ = function () {
			setTimeout(function () {
				tryCall(fns.shift());
				if (terminate())
					callFunctions_();
			}, getDelay());
		};
		callFunctions_();
	};

	let _tryCall = function (ignoreErrors, errors, fn) {
		try {
			fn();
		}
		catch (e) {
			if (!ignoreErrors)
				throw e;
			errors.push(e);
		}
	};

	return ass;
})();