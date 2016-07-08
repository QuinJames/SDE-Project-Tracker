trackerApp.directive("questionPanel", function(){
   return {
       restrict: 'E',
       templateUrl: "static/html/questionPanel.htm",
       scope: {
           header: "@",
           fieldOne: "@",
           fieldTwo: "@",
           fieldOneModel: "@",
           fieldTwoModel: "@",
           commentModel: "@"
       }
   }; 
});