'use strict';



var App = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'pascalprecht.translate']);


//get value from input
$(":file").change(function() {
  var n = $('#file').val($(":file").val().replace("C:\\fakepath\\", "C:/fakepath/"));
  n.trigger('input');
  n.trigger('change');
});
