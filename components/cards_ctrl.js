(function () {

  "use strict";

  angular
    .module("ngCards")
    .controller("cardsCtrl", function ($scope, $http, cardsFactory, $mdSidenav, $mdToast, $mdDialog) {

      cardsFactory.getcards().then(function(cards){
        $scope.cards = cards.data;
      });

      var contact = {
        name: "Joka Jokunen",
        phone: "05046512345",
        email: "asdf@gaymail.fug"
      }

      $scope.openSidebar = function () {
        $mdSidenav('left').open();
      }

      $scope.closeSidebar = function () {
        $mdSidenav('left').close();
      }

      $scope.savecard = function (card) {
        if (card) {
          card.contact = contact;
          $scope.cards.push(card);
          $scope.card = {};
          $scope.closeSidebar();
          showToast("card saved");
        }
      }

      $scope.editcard = function (card) {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.card = card;
      }

      $scope.saveEdit = function () {
        $scope.editing = false;
        $scope.card = {};
        $scope.closeSidebar();
        showToast("card edited");
      }

      $scope.deletecard = function (event, card) {
        var confirm = $mdDialog.confirm()
          .title("Are you sure you want to delete " + card.title + "?")
          .ok("Yes")
          .cancel("No")
          .targetEvent(event);
        $mdDialog.show(confirm).then(function () {
          var index = $scope.cards.indexOf(card);
          $scope.cards.splice(index, 1);
        }, function () {
          
        });
      }

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple().content(message).position("top, right").hideDelay(3000)
        );
      }

    });
})();
