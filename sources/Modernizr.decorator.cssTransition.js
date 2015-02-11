(function() {

	angular
		.module( 'angular.modularModernizr' )
		.config( [ '$provide', function ( $provide ) {
			$provide.decorator( 'Modernizr', decoratorDefinition );
		}]);

	decoratorDefinition.$inject = [ '$delegate', '$document' ];

	function decoratorDefinition( $delegate, $document ) {
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
		var documentElement = angular.element( $document[0].documentElement );
		documentElement.addClass( ( $delegate.supportsCssTransitions ? '' : 'no-' ) + 'csstransitions' );

		return $delegate;


		// ****************
		// Implementation
		// ****************
	}

})();