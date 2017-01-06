angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController ( $http ) {
  var vm = this;
  vm.newAlbum = {};

  $http({
   method: 'GET',
   url: '/api/albums'
 }).then(function successCallback(response) {
   console.log(response);
    vm.albums = response.data;
 }, function errorCallback(response) {
   console.log('There was an error getting the data', response);
 });

 vm.createAlbum = function () {
   $http({
     method: 'POST',
     url: '/api/albums',
     data: { name: vm.newAlbum.name,
      artistName: vm.newAlbum.artistName,
      genres: vm.newAlbum.genres,
      releaseDate: vm.newAlbum.releaseDate
     }
   }).then(function successCallback(response) {
     console.log(response);
     vm.albums.push(response.data);
   }, function errorCallback(response) {
     console.log('There was an error posting the data', response);
   });
 }

}
