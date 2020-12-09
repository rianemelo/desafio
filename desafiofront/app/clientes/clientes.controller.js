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
        vm.buscarAluguelPorCpf = alugarService.buscarAluguelPorCpf;
        vm.verHistorico = verHistorico;
        vm.historico = historico;
        vm.listarClientes = listarClientes;
        vm.buscarCep = buscarCep;

        function iniciar() {
            return vm.listarClientes();
        }

        function submit() {
            vm.validar = false;
            vm.cliente.endereco = vm.cliente.end.logradouro + ' ' +
                vm.cliente.end.complemento + ' ' +
                vm.cliente.end.bairro + ' ' +
                vm.cliente.end.cidade + ' ' +
                vm.cliente.end.uf + ' ' +
                vm.cliente.end.cep.toString() + '.';

            console.log('vm.cliente==>>', vm.cliente);
            return service.inserirCliente(vm.cliente)
                .then(function (_resp) {
                    helper.go('/clientes/listar');
                    if (_resp.error) {
                        helper.addAlerta(_resp.msg, 'danger');
                    } else {
                        helper.addAlerta("Cliente cadastrado com sucesso!", "success");
                    }
                });
        }

        function listarClientes() {
            return service.listarClientes()
                .then(function (_listaClientes) {
                    vm.listaClientes = _listaClientes;
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

        function buscarCep() {
            vm.error = '';
            var cepString = vm.cliente.end.cep ? vm.cliente.end.cep.toString() : '';
            var _cep = vm.cliente.end.cep ? vm.cliente.end.cep : '';
            if (cepString.length != 8) {
                vm.error = "Digite os 8 números do CEP.";
            } else {
                return service.buscarCep(vm.cliente.end.cep)
                    .then(function (_resp) {
                        if (_resp.erro === true) {
                            vm.error = "CEP não existente.";
                        } else {
                            vm.cliente.end = {
                                cep: _cep,
                                logradouro: _resp.logradouro,
                                complemento: _resp.complemento,
                                bairro: _resp.bairro,
                                cidade: _resp.localidade,
                                uf: _resp.uf
                            }
                        }

                    });
            }
        }

        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        vm.consultar = consultar;

        function consultar() {
            return service.buscarClientePorCpf(vm.cpf)
                .then(function (_resp) {
                    if (_resp.error) {
                        helper.addAlerta(_resp.msg, 'danger');
                    }
                });
        }

        /* ***************    FUNÇÕES INTERNAS    ******************************** */



    }

})();