(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('AlugarService', alugarService);

        alugarService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function alugarService($http, constantes, helper) {

        return {

        }

        // ======================================

/*         function listarClientes() {
            return $http.get(constantes.URL_BASE + '/cliente')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

        function inserirCliente(_params) {
            return $http.post(constantes.URL_BASE + '/cliente', _params)
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }
 */    

    }


})();