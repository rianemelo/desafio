(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .config(routes)
        .run(configDefaults);

    routes.$inject = ['$routeProvider'];
    configDefaults.$inject = ['$rootScope'];

    function routes($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'carros/carros.tpl.html' //na "home" quero só os carros free
            })
            .when('/clientes/listar', {
                templateUrl: 'clientes/listar.tpl.html'
            })
            .when('/clientes/new', {
                templateUrl: 'clientes/formulario.tpl.html'
            })
            .when('/alugar', {
                templateUrl: 'alugar/formulario.tpl.html'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.alertas = [];
    }

})();