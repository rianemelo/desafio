package br.com.stefanini.maratonadev.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;

import org.eclipse.microprofile.opentracing.Traced;

import br.com.stefanini.maratonadev.model.Aluguel;
import br.com.stefanini.maratonadev.model.Carro;
import br.com.stefanini.maratonadev.model.Cliente;
import io.quarkus.panache.common.Sort;


@RequestScoped
@Traced
public class AluguelDao {
	
	public List<Aluguel> listar() {
        return Aluguel.listAll(Sort.by("data"));
    }
		
	public List<Aluguel> buscarAluguelPorPlaca(String placa) { 
		return Aluguel.list("carro", Sort.by("data").descending(), new Carro(placa));
    } 
	
	public List<Aluguel> buscarAluguelPorCpf(Long cpf) {
		return Aluguel.list("cliente", Sort.by("data").descending(), new Cliente(cpf));
    }
	
	@Transactional
	public void inserir(Aluguel aluguel) {
		aluguel.persistAndFlush();	
	}
	
	
}

