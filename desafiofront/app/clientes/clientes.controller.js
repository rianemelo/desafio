(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('ClientesController', clientesController);

        clientesController.$inject = ['HelperFactory', 'ClienteService'];

    function clientesController(helper, service) {
        var vm = this;
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.iniciar = iniciar;
        vm.submit = submit;
        

        function iniciar() {
            //helper.addAlerta("Cliente cadastrado com sucesso!", "succes");
            return vm.listarClientes();
            

        }

        function submit() {
            return service.inserirCliente(vm.cliente)
                .then(function (_resp) {
                    helper.go('/clientes/listar');
                    helper.addAlerta("Cliente cadastrado com sucesso!", "info");
            
                    /* if (_resp.erros) {
                        helper.addMsg(null, 'danger', 'Tente novamente');
                    } else
                        helper.addAlerta("Cliente cadastrado com sucesso!", "succes"); */
                    //helper.rootScopeApply();
                });
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        vm.listarClientes = listarClientes;

        /* ***************    FUNÇÕES INTERNAS    ******************************** */
        function listarClientes() {
            return service.listarClientes()
                .then(function (_listaClientes) {
                    vm.listaClientes = _listaClientes;
                    //helper.rootScopeApply();
                });
        }


    }

})();