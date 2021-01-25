# como rodar?

1. Apos clonar o projeto acesse o diretorio "desafiofront" e execute os comandos: 

npm install (para instalar as dependencias, necessario rodar apenas uma vez)

e npm start (para executar o projeto localmente). Apos executar os comandos acima, o 

front-end ficara disponivel em http://localhost:3000 .

2. Acesse o diretorio "desafioapi" e rode o comando  mvnw compile quarkus:dev (para executar

o projeto localmente). O back-end ficara disponivel em http://localhost:8080/api

e utilize o swagger para ver todos os endpoints em http://localhost:8080/swagger-ui/ .

## Sobre o projeto

Uma locadora de automoveis deseja fazer um sistema de locacao de veiculos. A locadora

so permite que um cliente alugue um carro por vez e um mesmo carro so pode ser alugado para

um outro cliente no momento que ele se encontra disponivel novamente. Essa é a regra de  

negocio para o aluguel de carros. 

1. Para cadastro do cliente (front-end)
Campo Nome:
▪ Campo obrigatorio;
▪ Mínimo de 3 caracteres;
▪ Máximo de 100 caracteres;
▪ Permite apenas letras e espacos.
Campo CPF:
▪ Campo obrigatorio;
▪ Permite apenas numeros.
Campo Endereco (CEP, Logradouro, Complemento, bairro, cidade e UF):
▪ Obrigatorio preenchimento de CEP, bairro, cidade e uf;
▪ Deve estar integrado com um servico de consulta de CEP (https://viacep.com.br);
▪ O usuario pode alterar os dados que retornaram do serviço de consulta de CEP.
Campo E-mail:
▪ Deve ser um e-mail valido.
Campo Contato:
▪ Deve ser um telefone residencial ou celular valido.

2. Para cadastro do cliente (back-end)
Para cada cliente, aplicar as seguintes regras:
▪ Nao permitir dois clientes com mesmo CPF;
▪ O nome nao deve ter mais que 100 caracteres ou menos que 3.

3. Para alugueis de carros (front-end)
▪ Nao permitir aluguel sem cliente.
▪ Exibir somente carros disponiveis para aluguel.

4. Para alugueis de carros (back-end)
▪ Nao permitir que um cliente alugue mais de um carro.
▪ Nao permitir que o mesmo carro seja alugado por mais de um cliente simultaneamente.

A funcionalidade de “listar carros” diferencia carros disponiveis dos carros alugados 

e exibe o atual locatario.

A funcionalidade de “listar clientes” indica se ele tem um carro alugado e qual modelo.

A funcionalidade “exibir histórico de cliente” apresenta o histórico de todos os carros

que o cliente ja alugou.
