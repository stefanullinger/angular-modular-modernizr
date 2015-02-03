(function() {

	angular
		.module( 'angularModularModernizr' )
		.config( [ '$provide', function ( $provide ) {
			$provide.decorator( 'Modernizr', decoratorDefinition );
		}]);

	decoratorDefinition.$inject = [ '$delegate' ];

	function decoratorDefinition( $delegate ) {
		// ****************
		// Public
		// ****************
		$delegate.getTranslateValue        = getTranslateValue;
		$delegate.supportsCssTransforms    = !!$delegate.testAllProps( 'transform' );
		$delegate.supportsCssTransforms3d  = testSupportsCssTransforms3d();
		$delegate.transformProperty        = $delegate.prefixed( 'transform' );


		// ****************
		// Initialization
		// ****************
		return $delegate;


		// ****************
		// Implementation
		// ****************
		function getTranslateValue( x, y, z ) {
			x = x || 0;
			y = y || 0;
			z = z || 0;

			var result = 'translate(' + x + ', ' + y + ')';

			if ( $delegate.supportsCssTransforms3d ) {
				result = 'translate3d(' + x + ', ' + y + ', ' + z + ')';
			}

			return result;
		}

		function testSupportsCssTransforms3d() {
			var result = !!$delegate.testAllProps( 'perspective' );

			if ( result && 'webkitPerspective' in document.documentElement.style ) {
				$delegate.injectElementWithStyles( '@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
					result = node.offsetLeft === 9 && node.offsetHeight === 3;
				});
			}

			return result;
		}
	}

})();