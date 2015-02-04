(function() {

	angular
		.module( 'angularModularModernizr' )
		.config( [ '$provide', function ( $provide ) {
			$provide.decorator( 'Modernizr', decoratorDefinition );
		}]);

	decoratorDefinition.$inject = [ '$delegate', 'ModernizrConstant' ];

	function decoratorDefinition( $delegate, ModernizrConstant ) {
		// ****************
		// Public
		// ****************
		$delegate.supportsTouch = supportsTouch;


		// ****************
		// Initialization
		// ****************
		return $delegate;


		// ****************
		// Implementation
		// ****************
		function supportsTouch() {
			var bool;

			if ( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch) {
				bool = true;
			} else {
				$delegate.injectElementWithStyles( [ '@media (', ModernizrConstant.PREFIXES.join( 'touch-enabled),(' ), ModernizrConstant.ELEMENT_TAG, ')', '{#modernizr{top:9px;position:absolute}}' ].join( '' ), function( node ) {
					bool = node.offsetTop === 9;
				});
			}

			return bool;
		}
	}

})();