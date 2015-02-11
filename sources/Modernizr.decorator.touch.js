(function() {

	angular
		.module( 'angular.modularModernizr' )
		.config( [ '$provide', function ( $provide ) {
			$provide.decorator( 'Modernizr', decoratorDefinition );
		}]);

	decoratorDefinition.$inject = [ '$delegate', '$document', 'ModernizrConstant' ];

	function decoratorDefinition( $delegate, $document, ModernizrConstant ) {
		// ****************
		// Public
		// ****************
		$delegate.supportsTouch = supportsTouch();


		// ****************
		// Initialization
		// ****************
		var documentElement = angular.element( $document[0].documentElement );
		documentElement.addClass( ( $delegate.supportsTouch ? '' : 'no-' ) + 'touch' );

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