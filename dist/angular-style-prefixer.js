(function() {
  'use strict';
  angular.module('heymath.ngStylePrefixer', []).config([
    '$provide', function($provide) {
      return $provide.decorator('ngStyleDirective', [
        '$delegate', function($delegate) {
          $delegate.shift();
          return $delegate;
        }
      ]);
    }
  ]).directive('ngStyle', function() {
    return {
      link: function(scope, element, attrs) {
        var ng_prefix, prefixer, prefixes;
        ng_prefix = '-prefix-';
        prefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];
        prefixer = function(styles) {
          var attr, prefix, prefixed, prefixed_attr, style, unprefixed_attr, _i, _len;
          prefixed = {};
          for (attr in styles) {
            style = styles[attr];
            if (attr && style) {
              if (attr.search(ng_prefix) !== -1) {
                unprefixed_attr = attr.replace(ng_prefix, '');
                for (_i = 0, _len = prefixes.length; _i < _len; _i++) {
                  prefix = prefixes[_i];
                  prefixed_attr = "" + prefix + unprefixed_attr;
                  prefixed[prefixed_attr] = style;
                }
                prefixed[unprefixed_attr] = style;
              } else {
                prefixed[attr] = style;
              }
            }
          }
          return prefixed;
        };
        return scope.$watch(attrs.ngStyle, function(newStyles, oldStyles) {
          var style, val;
          if (oldStyles && newStyles !== oldStyles) {
            for (val in oldStyles) {
              style = oldStyles[val];
              element.css(style, '');
            }
          }
          if (newStyles) {
            return element.css(prefixer(newStyles));
          }
        }, true);
      }
    };
  });

}).call(this);
