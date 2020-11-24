(function () {
    "use strict";

    angular.module('autoLocadoraApp')
        .controller('AlugarController', alugarController);

        alugarController.$inject = ['HelperFactory', 'AlugarService', '$routeParams', 'CarrosService', '$filter'];

    function alugarController(helper, service, $routeParams, carrosService, $filter) {
        
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
            //console.log("AlugarController called!");
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
            //console.log("$routeParams=>>", $routeParams); //vem do routes
        }

        function alugar() {
            //vm.isValido(vm.aluguel);
            return service.alugar(vm.aluguel)
                .then(function (_resp) {
                    helper.go('/home');
                    helper.addAlerta("Aluguel realizado com sucesso!", "info");
            
                    /* if (_resp.erros) {
                        helper.addMsg(null, 'danger', 'Tente novamente');
                    } else
                        helper.addAlerta("Cliente cadastrado com sucesso!", "succes"); */
                    //helper.rootScopeApply();
                });
        }
        
        /* ***************    FUNÇÕES ADD 'VM' PARA TESTES     **************** */
        

        /* ***************    FUNÇÕES INTERNAS    ******************************** */
        //Não permitir aluguel sem cliente & Exibir somente carros disponíveis para aluguel.    
        /* function sendError(_error) {
            return { error: true, msg: _error.data.message };
        } */
/*         function validar(aluguel) {
            return  
        }
 */ 
    }

})();