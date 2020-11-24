(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('AlugarService', alugarService);

        alugarService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function alugarService($http, constantes, helper) {

        return {
            listar : listar,
            alugar: alugar
        }

        // ======================================

        function listar() {
            return $http.get(constantes.URL_BASE + '/aluguel')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

        function alugar(_params) {
            return $http.post(constantes.URL_BASE + '/aluguel', _params)
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }
    

    }


})();