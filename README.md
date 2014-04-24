angular-style-prefixer
======================

> Angular directive to auto-prefix ng-style attr properties in style attr.


Install
=======

``$ bower install angular-style-prefixer``

How to
======

Use it simply declaring it in your Angular App dependencies.
It will disable default ngStyleDirective, and is based on default ngStyleDirective :
```javascript
angular.module('myApp', ['heymath.ngStylePrefixer'])
```

Then just use ```-prefix-``` in the ng-style attr of html elements :
```html
<div ng-style="{'-prefix-transform': 'scale(1)'}"></div>
```
To generate :
```html
<div style="-webkit-transform: scale(1); -moz-transform: scale(1); -o-transform: scale(1); -ms-transform: scale(1); transform: scale(1);"></div>
```

To do
=====

- Code optimization
- Tests
