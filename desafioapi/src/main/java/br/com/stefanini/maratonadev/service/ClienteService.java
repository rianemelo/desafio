package br.com.stefanini.maratonadev.service;


import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.NotAllowedException;
import javax.ws.rs.NotFoundException;

import org.eclipse.microprofile.opentracing.Traced;

import br.com.stefanini.maratonadev.dao.ClienteDao;
import br.com.stefanini.maratonadev.dto.AluguelDto;
import br.com.stefanini.maratonadev.dto.ClienteDto;

import br.com.stefanini.maratonadev.model.Cliente;
import br.com.stefanini.maratonadev.model.parser.ClienteParser;


@RequestScoped
@Traced
public class ClienteService {
	@Inject
    ClienteDao dao;
	
	@Inject
	AluguelService aluguelService;
	
	public List<ClienteDto> listar(){
        return dao.listar().stream().map(ClienteParser.get()::dto).collect(Collectors.toList());
    }
	
	@Transactional(rollbackOn = Exception.class) 
	public void inserir(ClienteDto clienteDto) {
		validar(clienteDto);
		
		Cliente cliente = ClienteParser.get().entidade(clienteDto);
		dao.inserir(cliente);
	}

	public ClienteDto buscarPorCpf(Long cpf){
		try {
			ClienteDto clienteDto = ClienteParser.get().dto(dao.buscarPorCpf(cpf));
			return clienteDto;
		} catch (NullPointerException e) {
			return null;
		}
		
    }
	
	public void isClienteFree(Long cpf) {
    	List<AluguelDto> aluguel = aluguelService.buscarAluguelPorCpf(cpf);
    	if ( aluguel.size() > 0 ) {
    		if ( aluguel.get(0).getStatus().equals("ON") ) {
        		throw new NotAllowedException("Cliente já possui carro alugado!");
        	}
		}
    }
    
	public void validar(ClienteDto clienteDto) { //validar nome(max 100, min 3) e CPF(não cadastrado) 
		try {
			int nome = clienteDto.getNome().length();
			if ( nome > 100 || nome < 3 ) {
				throw new NotAllowedException("Nome máx 100 e min 3 caracteres!");
			}
		} catch (NullPointerException e) {
			// TODO: handle exception
		}
		
		try {
			ClienteDto clienteDtoBanco = buscarPorCpf(clienteDto.getCpf());
			if ( clienteDtoBanco != null ) {
				throw new NotAllowedException("CPF já cadastrado!");
			}
		} catch (NullPointerException e) {
			// TODO: handle exception
		}	
	}
	
	@Transactional(rollbackOn = Exception.class)
	public void atualizar(Cliente cliente) {
		dao.atualizar(cliente);
	}
	
	@Transactional(rollbackOn = Exception.class)
	public void excluir(Long cpf) {
		if ( buscarPorCpf(cpf) == null ) {
			throw new NotFoundException();
		}
		dao.excluir(cpf);
	}
	
}