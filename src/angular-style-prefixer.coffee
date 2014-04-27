'use strict'

angular.module('heymath.ngStylePrefixer', [])
  .config(['$provide', ($provide) ->
    $provide.decorator 'ngStyleDirective', ['$delegate', ($delegate) ->
      do $delegate.shift
      $delegate
    ]
  ])
  .directive('ngStyle', ->
    link: (scope, element, attrs) ->
      ng_prefix = '-prefix-'
      prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']
      
      prefixer = (styles) ->
        prefixed = {}
        for attr, style of styles
          if attr and style
            if attr.search(ng_prefix) isnt -1
              unprefixed_attr = attr.replace ng_prefix, ''
              for prefix in prefixes
                prefixed_attr = "#{prefix}#{unprefixed_attr}" 
                prefixed[prefixed_attr] = style
              prefixed[unprefixed_attr] = style
            else
              prefixed[attr] = style
        prefixed

      scope.$watch(attrs.ngStyle, (newStyles, oldStyles) ->
        if oldStyles and newStyles isnt oldStyles
          for val, style of oldStyles
            element.css style, '' if style
        element.css prefixer(newStyles) if newStyles
      , true)
  )
