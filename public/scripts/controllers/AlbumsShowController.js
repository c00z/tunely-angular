angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};

  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.album = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

vm.createSong = function () {
  $http({
    method: 'POST',
    url: '/api/albums/'+$routeParams.id +'/songs',
    data: vm.newSong
  }).then(function songCallback(response) {
    vm.album.songs.push(response.data);
  }, function errorCallback(response) {
    console.log('There was an error posting the data', response);
  });
  }

vm.deleteSong = function (song){
    $http({
      method: 'DELETE',
      url: '/api/albums/'+$routeParams.id +'/songs/' + song._id
    }).then(function deleteSuccess(response){
      console.log(response, "this is the deleted song");
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index, 1);
    }), function deleteError (response){
      console.log("ERROR!", response);
    }
  }


  vm.editingSong = function (song) {
    $http({
    method: 'PUT',
    url:'/api/albums/'+$routeParams.id +'/songs/' + song._id,
    data: song
  }).then(function successCallback(editSong) {
    console.log("EDIT IS WERKIN",editSong);
    vm.song = editSong.data;
    // $location.path('/');
  }, function errorCallback(response) {
    console.log('There was an error updating the data', response);
  });
  }


  // $http({
  //   method: 'GET',
  //   url: 'https://api.spotify.com/v1/search' + album.Name
  // }).then(function successCallback(json) {
  //
  //   console.log('https://api.spotify.com/v1/search' + album.Name)
  //   // vm.album = json.data;
  // }, function errorCallback(response) {
  //   console.log('There was an error getting the data', response);
  // });
  //




}
