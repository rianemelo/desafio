(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('ClienteService', clienteService);

    clienteService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function clienteService($http, constantes, helper) {

        return {
            listarClientes: listarClientes,
            inserirCliente: inserirCliente
        }

        // ======================================

        function listarClientes() {
            return $http.get(constantes.URL_BASE + '/cliente')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

        function inserirCliente(_params) {
            return $http.post(constantes.URL_BASE + '/cliente', _params)
                .then(function (response) {
                    console.log("response from service=====>", response);
                    return response.data;
                })
                .catch(helper.sendError);
        }
    

    }


})();