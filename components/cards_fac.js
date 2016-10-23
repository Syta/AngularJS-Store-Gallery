(function(){
    "use strict"
    
    angular
      .module("ngCards")
      .factory("cardsFactory", function($http){
          
        function getcards(){
          return $http.get('data/cards.json');
        }
        
        return{
          getcards: getcards
        }
    });
})();