(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems',foundItemsDirective)
    .constant('BaseUrl', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.logMenuItems = function (searchTerm) {
            if (searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                promise.then(function (response) {
                menu.menuItems = response;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                })
            }
        };

        menu.removeItem = function (index) {
            MenuSearchService.removeItem(index);
        };
    }

    MenuSearchService.$inject = ['$http', 'BaseUrl']
    function MenuSearchService($http, BaseUrl) {
        var service = this;

        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (BaseUrl + "/menu_items.json"),
                params: {
                    description: searchTerm
                }
            }).then(function (result){
                foundItems = result.data.menu_items.filter(item => {
                                            return item.description
                                                .toString()
                                                .toLowerCase()
                                                .indexOf(searchTerm.toLowerCase()) >= 0
                                            })
                return foundItems;
            });
        }

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        }
    }

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items:    '<',
                onDelete: '&onRemove'
            }
        };
        return ddo;
    }

})();