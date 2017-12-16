'use strict';

angular.module('myApp').controller('SongController', ['$scope', 'SongService', function($scope, SongService) {
  var self = this;
  self.song = { id: null, name: '', genre: '', file: '' };
  self.songs = [];

  self.submit = submit;
  self.edit = edit;
  self.remove = remove;
  self.reset = reset;




  fetchAllSongs();

  function fetchAllSongs() {
    SongService.fetchAllSongs()
      .then(
        function(d) {
          //Set object
          self.songs = d;
          //Checked count
          $scope.checkedCount = function() {
            return d.filter(function(song) {
              return song.checked;
            }).length;
          };



          $scope.removeSelected = function() {
            var i = $scope.aCandidates.length;
            // reversed loop because you change the array
            while (i--) {
              var u = $scope.aCandidates[i];
              if (u.checked) {

                $scope.aCandidates.splice(i, 1);
              }
            }
          };

          //replace file path
          $scope.addText = 'Attach {0}';
          $scope.getText = function(obj) {
            return $scope.addText.replace("{0}", obj).replace("C:/fakepath/", '')
          };

          //total item lenght
          $scope.totalItems = d.length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;
          $scope.$watch('currentPage', function() {
            setPagingData($scope.currentPage);
          });
          //set paging data
          function setPagingData(page) {
            $scope.currentPage = page;
            var pagedData = d.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
            $scope.aCandidates = pagedData;
          }

          //orderDesc item
          var cols = [{
            name: 'name',
            orderDesc: false
          }, {
            name: 'genre',
            orderDesc: false
          }];

          //funtion of orderDesc item
          $scope.sortData = function(sortCol) {
            // make sure it a valid column
            var column = cols.find(function(col) {
              return col.name === sortCol;
            });

            if (!column) return;

            column.orderDesc = !column.orderDesc;

            var order = !column.orderDesc ? 1 : -1;
            d.sort(function(a, b) {
              if (a[column.name] < b[column.name])
                return -1 * order;
              if (a[column.name] > b[column.name])
                return 1 * order;
              return 0;
            });

            setPagingData($scope.currentPage);
          };
        },
        function(errResponse) {
          console.error('Error while fetching Songs');
          $scope.Connect = "Connect failed";
        }
      );
  }

  function createSong(song) {
    SongService.createSong(song)
      .then(
        fetchAllSongs,
        function(errResponse) {
          console.error('Error while creating Song');
        }
      );
  }

  function updateSong(song, id) {
    SongService.updateSong(song, id)
      .then(
        fetchAllSongs,
        function(errResponse) {
          console.error('Error while updating Song');
        }
      );
  }

  function deleteSong(id) {
    SongService.deleteSong(id)
      .then(
        fetchAllSongs,
        function(errResponse) {
          console.error('Error while deleting Song');
        }
      );
  }

  function submit() {
    if (self.song.id === null) {
      console.log('Saving New Song', self.song);
      createSong(self.song);
    } else {
      updateSong(self.song, self.song.id);
      console.log('Song updated with id ', self.song.id);
    }
    reset();
  }

  function edit(id) {
    console.log('id to be edited', id);
    for (var i = 0; i < self.songs.length; i++) {
      if (self.songs[i].id === id) {
        self.song = angular.copy(self.songs[i]);
        break;
      }
    }
  }

  function remove(id) {
    console.log('id to be deleted', id);
    if (self.song.id === id) {
      reset();
    }
    deleteSong(id);
  }


  function reset() {
    self.song = { id: null, name: '', genre: '', file: $('#nulls').val('') };
    $scope.myForm.$setPristine(); //reset Form
  }



}]);
