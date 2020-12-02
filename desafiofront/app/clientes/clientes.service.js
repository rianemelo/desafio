(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('ClientesService', clientesService);

    clientesService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function clientesService($http, constantes, helper) {

        return {
            listarClientes: listarClientes,
            inserirCliente: inserirCliente,
            buscarClientePorCpf: buscarClientePorCpf
        }

        // ======================================

        function listarClientes() {
            return $http.get(constantes.URL_BASE + '/cliente')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError); //no backend ainda não tem exceções que mandem erros
        }

        function inserirCliente(_params) {
            return $http.post(constantes.URL_BASE + '/cliente', _params)
                .then(function (response) {
                    console.log("response from service=====>", response);
                    return response.data;
                })
                .catch(helper.sendError);
        }
    
        function buscarClientePorCpf(cpf) {
            return $http.get(constantes.URL_BASE + '/cliente/' + cpf)
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
                
                /* sem usar a helper
                .catch(function (error) {
                    console.log(error.data.message);
                }); */
        }

    }
















})();