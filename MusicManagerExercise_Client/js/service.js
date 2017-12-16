'use strict';

angular.module('myApp').factory('SongService', ['$http', '$q', function($http, $q) {

  var REST_SERVICE_URI = 'http://localhost:8080/MusicManagerExercise/music/song/';

  var factory = {
    fetchAllSongs: fetchAllSongs,
    createSong: createSong,
    updateSong: updateSong,
    deleteSong: deleteSong
  };

  return factory;

  function fetchAllSongs() {
    var deferred = $q.defer();
    $http.get(REST_SERVICE_URI)
      .then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(errResponse) {
          console.error('Error while fetching Songs');
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  }

  function createSong(song) {
    var deferred = $q.defer();
    $http.post(REST_SERVICE_URI, song)
      .then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(errResponse) {
          console.error('Error while creating Song');
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  }


  function updateSong(song, id) {
    var deferred = $q.defer();
    $http.put(REST_SERVICE_URI + id, song)
      .then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(errResponse) {
          console.error('Error while updating Song');
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  }

  function deleteSong(id) {
    var deferred = $q.defer();
    $http.delete(REST_SERVICE_URI + id)
      .then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(errResponse) {
          console.error('Error while deleting Song');
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  }

}]);
