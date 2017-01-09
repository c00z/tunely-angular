angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);



AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
var vm = this;
var albumId = $routeParams.id;

$http({
    method: 'GET',
    url: '/api/albums/'+ albumId
  }).then(function successCallback(response) {
    console.log("Hitting Get Success on AlbumsShowController", response.data);
    vm.album = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);

  });


}
