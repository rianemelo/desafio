(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('CarrosController', carrosController);

        carrosController.$inject = ['HelperFactory', 'CarrosService'];

    function carrosController(helper, service) {
        var vm = this;
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.iniciarCarros = iniciarCarros;

        function iniciarCarros() {
            //console.log("CarrosController called!");
            return vm.listarCarros();
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        vm.listarCarros = listarCarros;

        /* ***************    FUNÇÕES INTERNAS    ******************************** */
        function listarCarros() {
            return service.listarCarros()
                .then(function (_listaCarros) {
                    vm.listaCarros = _listaCarros;
                    //helper.rootScopeApply();
                });
        }

    }

})();