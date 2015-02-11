(function() {

	angular
		.module( 'angular.modularModernizr' )
		.factory( 'Modernizr', serviceDefinition );

	serviceDefinition.$inject = [ 'ModernizrConstant' ];

	function serviceDefinition( ModernizrConstant ) {
		// ********
		// Public
		// ********
		var service = {
			injectElementWithStyles  : injectElementWithStyles,
			prefixed                 : prefixed,
			testAllProps             : testPropsAll,
			testProp                 : testProp
		};

		// ****************
		// Initialization
		// ****************
		var modernizrElement       = document.createElement( ModernizrConstant.ELEMENT_TAG );
		var modernizrElementStyle  = modernizrElement.style;

		return service;


		// ****************
		// Implementation
		// ****************
		function contains( str, substr ) {
			return !!~('' + str).indexOf(substr);
		}

		function injectElementWithStyles( rule, callback, nodes, testnames ) {
			var style;
			var ret;
			var node;
			var docOverflow;

			var docElement  = document.documentElement;
			var div         = document.createElement( 'div' );
			var body        = document.body;
			var fakeBody    = body || document.createElement( 'body' );

			if ( parseInt( nodes, 10 ) ) {
				while ( nodes-- ) {
					node = document.createElement( 'div' );
					node.id = testnames ? testnames[ nodes ] : ModernizrConstant.ELEMENT_TAG + ( nodes + 1 );
					div.appendChild( node );
				}
			}

			style = [ '&#173;', '<style id="s', ModernizrConstant.ELEMENT_TAG, '">', rule, '</style>' ].join( '' );
			div.id = ModernizrConstant.ELEMENT_TAG;

			( body ? div : fakeBody ).innerHTML += style;
			fakeBody.appendChild( div );

			if ( !body ) {
				fakeBody.style.background = '';
				fakeBody.style.overflow = 'hidden';
				docOverflow = docElement.style.overflow;
				docElement.style.overflow = 'hidden';
				docElement.appendChild( fakeBody );
			}

			ret = callback( div, rule );

			if ( !body ) {
				fakeBody.parentNode.removeChild( fakeBody );
				docElement.style.overflow = docOverflow;
			} else {
				div.parentNode.removeChild( div );
			}

			return !!ret;
		}

		function is( obj, type ) {
			return typeof obj === type;
		}

		function prefixed( prop, obj, elem ) {
			if ( !obj ) {
				return testPropsAll( prop, 'pfx' );
			} else {
				return testPropsAll( prop, obj, elem );
			}
		}

		function testDOMProps( props, obj, elem ) {
			for ( var i in props ) {
				var item = obj[ props[ i ] ];

				if ( item !== undefined) {
					if ( elem === false )
						return props[ i ];

					if ( is( item, 'function' ) ) {
						return item.bind( elem || obj );
					}

					return item;
				}
			}
			return false;
		}

		function testProp( prop ) {
			return testProps( [ prop ] );
		}

		function testProps( props, prefixed ) {
			for ( var i in props ) {
				var prop = props[ i ];
				if ( !contains( prop, '-' ) && modernizrElementStyle[ prop ] !== undefined ) {
					return prefixed == 'pfx' ? prop : true;
				}
			}

			return false;
		}

		function testPropsAll( prop, prefixed, elem ) {
			var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1);
			var props = ( prop + ' ' + ModernizrConstant.CSSOM_PREFIXES.join( ucProp + ' ' ) + ucProp ).split(' ');

			if ( is( prefixed, 'string' ) || is( prefixed, 'undefined' ) ) {
				return testProps( props, prefixed );
			} else {
				props = ( prop + ' ' + ( ModernizrConstant.DOM_PREFIXES ).join( ucProp + ' ' ) + ucProp ).split(' ');
				return testDOMProps( props, prefixed, elem );
			}
		}
	}

})();