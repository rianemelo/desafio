(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('CarrosService', carrosService);

        carrosService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function carrosService($http, constantes, helper) {

        return {
            listarCarros: listarCarros,
            consultarCarro: consultarCarro
        }

        // ======================================

        function listarCarros() {
            return $http.get(constantes.URL_BASE + '/carro')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

        function consultarCarro(placa) {
            return $http.get(constantes.URL_BASE + '/carro/' + placa)
                .then(function (response) {
                    //console.log("response=>>", response);
                    return response.data;
                })
                .catch(helper.sendError);
        }
    }

})();