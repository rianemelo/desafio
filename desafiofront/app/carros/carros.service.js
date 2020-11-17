(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('CarrosService', carrosService);

        carrosService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function carrosService($http, constantes, helper) {

        return {
            listarCarros: listarCarros,
        }

        // ======================================

        function listarCarros() {
            return $http.get(constantes.URL_BASE + '/carro')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }
    }

})();