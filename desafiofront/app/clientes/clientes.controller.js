(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('ClientesController', clientesController);

        clientesController.$inject = ['HelperFactory', 'ClientesService', 'AlugarService', '$routeParams'];

    function clientesController(helper, service, alugarService, $routeParams) {
        var vm = this;
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.iniciar = iniciar;
        vm.submit = submit;
        vm.consultar = consultar;        
        vm.buscarAluguelPorCpf = alugarService.buscarAluguelPorCpf;
        vm.verHistorico = verHistorico;
        vm.historico = historico;


        function iniciar() {
            return vm.listarClientes();
        }

        function submit() {
            return service.inserirCliente(vm.cliente)
                .then(function (_resp) {
                    helper.go('/clientes/listar');
                    helper.addAlerta("Cliente cadastrado com sucesso!", "info");
                    if (_resp.erros) {
                        helper.addMsg(null, 'danger', 'Tente novamente');
                    } else
                        helper.addAlerta("Cliente cadastrado com sucesso!", "succes");
                    
                });
        }

        function listarClientes() {
            return service.listarClientes()
                .then(function (_listaClientes) {
                    vm.listaClientes = _listaClientes;
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

        function verHistorico(_cliente) {
            helper.go('/clientes/historico/' + _cliente.cpf);
        }

        function historico(_cpf) {
            if ($routeParams.cpf) {
                helper.setRootScope('cpf', $routeParams.cpf);
                return alugarService.buscarAluguelPorCpf($routeParams.cpf)
                .then(function (_historico) {
                    vm.historico = _historico;
                });
            }
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