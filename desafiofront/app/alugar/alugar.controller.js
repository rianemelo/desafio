(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('AlugarController', alugarController);

        alugarController.$inject = [
            'HelperFactory',
            'AlugarService',
            '$routeParams',
            'CarrosService',
            'ClientesService',
            '$rootScope'
        ];

    function alugarController(helper, service, $routeParams, carrosService, clientesService, $rootScope) {
        
        var vm = this;
        
        /* ***************    INIT VARIÁVEIS    *********************************** */
        

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.iniciar = iniciar;
        vm.irAlugar = irAlugar;
        vm.alugar = alugar;
        vm.listarCarros = listarCarros;
        vm.listarClientes = listarClientes;
        

        function iniciar() {
            if ($routeParams.placa) {
                helper.setRootScope('placa', $routeParams.placa);
                return carrosService.consultarCarro($routeParams.placa)
                    .then(function (_carro) {
                        vm.aluguel = {
                            placa: _carro.placa
                        }
                    });
            } else {
                listarCarros();
                listarClientes();
            }
        }

        function irAlugar(_carro) {
            helper.go('/alugar/' + _carro.placa);
        }

        function alugar() {
            return service.alugar(vm.aluguel)
                .then(function (_resp) {
                    helper.go('/home');
                    if (_resp.error) {
                        helper.addAlerta(_resp.msg, 'danger');
                    } else {
                        helper.addAlerta("Aluguel realizado com sucesso!", "info");
                    }
                });
                
        }
        
        function listarCarros() {
            return carrosService.listarCarros()
                .then(function (_listaCarros) {
                    vm.listaCarros = _listaCarros;
                });
        }

        function listarClientes() {
            return clientesService.listarClientes()
                .then(function (_listaClientes) {
                    vm.listaClientes = _listaClientes;
                });
        }
        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        

        /* ***************    FUNÇÕES INTERNAS    ******************************** */
        /* vm.buscarAluguelPorPlaca = buscarAluguelPorPlaca;
        vm.buscarClientePorCpf = buscarClientePorCpf;
        vm.isValido = isValido;
 */
        //Não permitir aluguel sem cliente & Exibir somente carros disponíveis para aluguel.    
        /* function sendError(_error) {
            return { error: true, msg: _error.data.message };
        } */

        /* function buscarAluguelPorCpf(_cpf) {
            return service.buscarAluguelPorCpf(vm.cliente.cpf)
                .then(function (_aluguel) {
                    vm.alugado = {
                        carro: _aluguel.placa
                    }
                })                
        } */
 
        /* function buscarClientePorCpf() {
            return clienteService.buscarClientePorCpf(vm.aluguel.cpf)
            .then(function (_cliente) {
                 vm.cliente = {
                    nome: _cliente.nome
                }
                console.log('vm.cliente', vm.cliente);
            });

        } */

        /* A placa de um carro aparece de duas formas:
        1: na lista, que só mostra placas OFF (i.e., carros atualmente não alugados),
        2: através do routeParams depois de clicar no ALUGAR, também só OFF
        assim, sem ulterior verificação se a placa está OFF*/
        /* function isValido() {    
            buscarClientePorCpf();
            return vm.cliente.nome ? true : false;
            
        } */
    }

})();