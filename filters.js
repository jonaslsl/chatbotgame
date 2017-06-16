angular.module('appFilters', []).filter('trustAsHtml', ['$sce', function($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  };
}]);