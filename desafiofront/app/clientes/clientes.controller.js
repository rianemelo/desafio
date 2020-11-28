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
        vm.consultar = consultar;        

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

        function listarClientes() {
            return service.listarClientes()
                .then(function (_listaClientes) {
                    vm.listaClientes = _listaClientes;
                    //helper.rootScopeApply();
                });
        }

        function consultar() {
            return service.buscarClientePorCpf(vm.cpf)
                .then(function (_resp) {
                    if (_resp.error) {
                        helper.addAlerta(_resp.msg, 'danger');
                    } else {
                        helper.addAlerta(_resp.message, 'success');
                    }
                });
        }

        /* function logar() {
            return service.logar(vm.login)
                .then(function (_resp) {
                    if (_resp.error) {
                        //console.log(_resp);
                        helper.addMsg(_resp.msg, 'danger');
                    } else {
                        //console.log(_resp);
                        helper.setRootScope('userLogged', _resp.userLogged);
                        // Posso usar simplesmente o 'helper.path' porque
                        // não preciso verificar se ele está logado, pois esse 
                        // é retorno de sucesso do login, mas quando precisar
                        // checar como nas outras rotas usamos o 'helper.go'
                        helper.path('/home');
                        helper.addMsg(_resp.message, 'success');
                    }
                });
        }
 */

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        vm.listarClientes = listarClientes;

        /* ***************    FUNÇÕES INTERNAS    ******************************** */
        


    }

})();