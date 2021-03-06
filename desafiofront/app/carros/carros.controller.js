(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('CarrosController', carrosController);

        carrosController.$inject = ['HelperFactory', 'CarrosService', '$rootScope'];

    function carrosController(helper, service, $rootScope) {
        var vm = this;
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.iniciar = iniciar;

        function iniciar() {
            return vm.listarCarros();
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        vm.listarCarros = listarCarros;

        /* ***************    FUNÇÕES INTERNAS    ******************************** */
        function listarCarros() {
            return service.listarCarros()
                .then(function (_listaCarros) {
                    vm.listaCarros = _listaCarros;
                });
        }

    }

})();