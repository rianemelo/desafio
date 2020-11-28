(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('AlugarController', alugarController);

        alugarController.$inject = [
            'HelperFactory',
            'AlugarService',
            '$routeParams',
            'CarrosService',
            'ClienteService'
        ];

    function alugarController(helper, service, $routeParams, carrosService, clienteService) {
        
        var vm = this;
        /* vm.aluguel = {
            placa: "",
            cpf: ""
        }; */
        /* ***************    INIT VARIÁVEIS    *********************************** */
        

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */
        vm.go = helper.go;
        vm.iniciarAlugar = iniciarAlugar;
        vm.irAlugar = irAlugar;
        vm.alugar = alugar;
        

        function iniciarAlugar() {
            if ($routeParams.placa) {
                helper.setRootScope('placa', $routeParams.placa);
                return carrosService.consultarCarro($routeParams.placa)
                    .then(function (_carro) {
                        vm.aluguel = {
                            placa: _carro.placa
                        }
                    });
            } else {
                return carrosService.listarCarros()
                .then(function (_listaCarros) {
                    vm.listaCarros = _listaCarros;
                });
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
                        helper.addAlerta(null, 'danger', 'Tente novamente');
                    } else
                        helper.addAlerta("Aluguel realizado com sucesso!", "info");
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

        /* function buscarAluguelPorPlaca(_placa) {
            return service.buscarAluguelPorPlaca(_placa)
                .then(function (_aluguel) {
                    vm.cliente = {
                        cpf: _aluguel.cpf
                    }
                })                
        }
 */
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