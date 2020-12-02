(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('AlugarService', alugarService);

        alugarService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function alugarService($http, constantes, helper) {

        return {
            listar : listar,
            alugar: alugar,
            buscarAluguelPorPlaca: buscarAluguelPorPlaca
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
                /* .catch(function (_error) {
                    console.log("ERROR=>>>", _error.data.message);
                    return { error: true, msg: _error.message };
                    console.log("+++++++++++")
                }); */ 
        }
    
        function buscarAluguelPorCpf(cpf) {
            return $http.get(constantes.URL_BASE + '/aluguel/cpf' + cpf)
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

        function buscarAluguelPorPlaca(placa) {
            return $http.get(constantes.URL_BASE + '/aluguel/placa' + placa)
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

    }


})();