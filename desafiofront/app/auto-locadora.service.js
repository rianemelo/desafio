(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .service('autoLocadoraService', autoLocadoraService);

    autoLocadoraService.$inject = ['$http', 'constantes', 'HelperFactory'];

    function autoLocadoraService($http, constantes, helper) {

        return {
            //listarCarros: listarCarros,
        }

        // ======================================

        /* function listarCarros() {
            return $http.get(constantes.URL_BASE + '/carro')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }    
 */
    }


})();