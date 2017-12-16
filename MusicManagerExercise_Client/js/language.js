App.config(["$translateProvider", function($translateProvider) {

  var en_translations = {
    "MusicManager": "Music Manager",
    "Admin": "Admin",
    "Add": "Add",
    "Delete": "Delete",
    "Language": "Language",
    "Search": "Search",
    "Name": "Name",
    "Genre": "Genre",
    "File": "File",
    "TotalItems": "Total items",
    "SelectedItems": "Selected items",
    "Previous": "Previous",
    "Next": "Next",
    "Connected": "Connected",
    "AddSong": "Add Song",
    "Close": "Close"
  }

  var vn_translations = {
    "MusicManager": "Quản Lý Nhạc",
    "Admin": "Quản trị",
    "Add": "Thêm",
    "Delete": "Xóa",
    "Language": "Ngôn ngữ",
    "Search": "Tìm kiếm",
    "Name": "Tên bài hát",
    "Genre": "Thể loại",
    "File": "Dữ liệu",
    "TotalItems": "Tổng số bài hát",
    "SelectedItems": "Bài hát đã chọn",
    "Previous": "Trước",
    "Next": "Sau",
    "Connected": "Đã kết nối",
    "AddSong": "Thêm bài hát",
    "Close": "Thoát"
  }

  $translateProvider.translations('en', en_translations);

  $translateProvider.translations('vn', vn_translations);

  $translateProvider.preferredLanguage('en');
  
  $translateProvider.useSanitizeValueStrategy('escapeParameters');

}]);

App.controller("translateController", ["$scope", "$translate", function($scope, $translate) {
  $scope.changeLanguage = function(lang) {
    $translate.use(lang);
  }
}]);
