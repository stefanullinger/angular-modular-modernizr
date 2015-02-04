(function() {

	var omPrefixes     = 'Webkit Moz O ms';

	angular
		.module( 'angularModularModernizr' )
		.constant( 'ModernizrConstant', {

			ELEMENT_TAG     : 'modernizr',
			PREFIXES        : ' -webkit- -moz- -o- -ms- '.split(' '),
			CSSOM_PREFIXES  : omPrefixes.split(' '),
			DOM_PREFIXES    : omPrefixes.toLowerCase().split(' ')

		});

})();