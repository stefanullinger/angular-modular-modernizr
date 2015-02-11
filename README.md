# angular-modular-modernizr
AngularJS based Modernizr service that let's you decide which checks to include.


## How to install

```
bower install angular-modular-modernizr
```

Reference the module in your app.

```javascript
(function() {

  angular
    .module( 'someApp', [
      'angular.modularModernizr'
    ] );

})();
```

## Release History

__0.4.0__

  * Renamed Angular module to have a consistent pattern with my other modules.

__0.3.2__

  * Fixed code to add classes to the document for each supported feature.

__0.3.1__

  * Fixed supportsTouch in touch decorator.

__0.3.0__

  * Added code to add classes to the document for each supported feature.

__0.2.0__

  * Added decorator to test for touch support.

__0.1.3__

  * Fixed typo in module file.

__0.1.2__

  * Set module file as first file in main property of bower.json.

__0.1.1__

  * Added main property to bower.json.

__0.1.0__

  * Added basic Modernizr service as well as cssTransform and cssTransition decorators.