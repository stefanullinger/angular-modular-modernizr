(function() {

	angular
		.module( 'angularModularModernizr' )
		.config( [ '$provide', function ( $provide ) {
			$provide.decorator( 'Modernizr', decoratorDefinition );
		}]);

	decoratorDefinition.$inject = [ '$delegate' ];

	function decoratorDefinition( $delegate ) {
		var transitionEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd', // Saf 6, Android Browser
			'MozTransition'    : 'transitionend',       // only for FF < 15
			'transition'       : 'transitionend'        // IE10, Opera, Chrome, FF 15+, Saf 7+
		};

		// ****************
		// Public
		// ****************
		$delegate.supportsCssTransitions      = !!$delegate.testAllProps( 'transition' );
		$delegate.transitionDurationProperty  = $delegate.prefixed( 'transitionDuration' );
		$delegate.transitionEndEventName      = transitionEndEventNames[ $delegate.prefixed( 'transition' ) ];


		// ****************
		// Initialization
		// ****************
		return $delegate;


		// ****************
		// Implementation
		// ****************
	}

})();