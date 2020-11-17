package br.com.stefanini.maratonadev.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import javax.ws.rs.NotFoundException;

import org.eclipse.microprofile.opentracing.Traced;

import br.com.stefanini.maratonadev.model.Cliente;
import io.quarkus.panache.common.Sort;


@RequestScoped
@Traced
public class ClienteDao {
	
	public List<Cliente> listar(){
        return Cliente.listAll(Sort.by("nome"));
    }
	
	@Transactional
	public void inserir(Cliente cliente) {
		Cliente.persist(cliente);
	}
	
	public Cliente buscarPorCpf(Long cpf) { //se não houver cliente com esse CPF, retorna null
        return Cliente.findById(cpf);
    }
	
	@Transactional
	public void atualizar(Cliente cliente) {
		
	}
	
	@Transactional
	public void excluir(Long cpf) {
		Cliente.deleteById(cpf);
	}
	
}
