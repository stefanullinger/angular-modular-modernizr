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
      'angularModularModernizr'
    ] );

})();
```

## Release History

__0.1.0__

  * Added basic Modernizr service as well as cssTransform and cssTransition decorators.