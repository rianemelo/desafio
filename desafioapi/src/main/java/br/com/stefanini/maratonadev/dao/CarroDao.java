package br.com.stefanini.maratonadev.dao;

import br.com.stefanini.maratonadev.model.Carro;

import io.quarkus.panache.common.Sort;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;

import org.eclipse.microprofile.opentracing.Traced;

import java.util.List;

@RequestScoped
@Traced
public class CarroDao {

    public List<Carro> listar(){
        return Carro.listAll(Sort.by("modelo,marca").ascending());
    }
    
    public Carro buscarPorPlaca(String placa){
        return Carro.findById(placa);
    }
    
    @Transactional
    public void atualizar(Carro carro) {
    	//Carro.update(query, params)
    }
}
