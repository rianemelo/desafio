package br.com.stefanini.maratonadev.service;


import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.NotAllowedException;

import org.eclipse.microprofile.opentracing.Traced;

import br.com.stefanini.maratonadev.dao.AluguelDao;
import br.com.stefanini.maratonadev.dto.AluguelDto;

import br.com.stefanini.maratonadev.model.Aluguel;
import br.com.stefanini.maratonadev.model.parser.AluguelParser;


@RequestScoped
@Traced
public class AluguelService {

	@Inject
	AluguelDao dao;
	
	@Inject
	CarroService carroService;
	
	@Inject
	ClienteService clienteService;
	
	public List<AluguelDto> listar() {
        return dao.listar().stream().map(AluguelParser.get()::dto).collect(Collectors.toList());
    }
	
	//Lista todos os aluguéis de um carro pela sua placa, que é o id do carro
	public List<AluguelDto> buscarAluguelPorPlaca(String placa) {
		List<Aluguel> aluguel = dao.buscarAluguelPorPlaca(placa);
		
		return aluguel
				.stream()
				.map(AluguelParser.get()::dto)
				.collect(Collectors.toList());

    } 
	
	//Lista todos os aluguéis de um cliente pelo seu cpf, que é o id do cliente
	public List<AluguelDto> buscarAluguelPorCpf(Long cpf) {
		List<Aluguel> aluguel = dao.buscarAluguelPorCpf(cpf);
		
		return aluguel
				.stream()
				.map(AluguelParser.get()::dto)
				.collect(Collectors.toList());
    }
	
	public void validar(AluguelDto aulguelDto) {	
		if ( clienteService.buscarPorCpf(aulguelDto.getCpf()) ==   null ) {
			throw new NotAllowedException("CPF fora do sistema!");
		}
		if ( carroService.buscarPorPlaca(aulguelDto.getPlaca()) ==   null ) {
			throw new NotAllowedException("Placa fora do sistema!");
		} 
		
		try {
			clienteService.isClienteFree(aulguelDto.getCpf());
			carroService.isCarroFree(aulguelDto.getPlaca());
		} catch (NullPointerException e) {
			// TODO: handle exception
		}
	}
	 	
	@Transactional(rollbackOn = Exception.class) 
	public void inserir(AluguelDto aluguelDto) {
		aluguelDto.setStatus("ON"); //sempre que insere um aluguel, o status será ON
		validar(aluguelDto);
		
		Aluguel aluguel = AluguelParser.get().entidade(aluguelDto);
		
		dao.inserir(aluguel);
	}
	
}

