package br.com.stefanini.maratonadev.model.parser;

import br.com.stefanini.maratonadev.dto.AluguelDto;
import br.com.stefanini.maratonadev.model.Aluguel;
import br.com.stefanini.maratonadev.model.Carro;
import br.com.stefanini.maratonadev.model.Cliente;
import br.com.stefanini.maratonadev.model.dominio.AluguelEnum;


public class AluguelParser {
	
	public static AluguelParser get(){
        return  new AluguelParser();
    }

    public AluguelDto dto(Aluguel entidade){
    	AluguelDto dto = new AluguelDto();

    	//dto.setId(entidade.getId());
        dto.setStatus(entidade.getStatus().name()); 
        dto.setPlaca(entidade.getCarro().getPlaca());
        dto.setCpf(entidade.getCliente().getCpf());
        dto.setData(entidade.getData());
        
        return dto;
    }
    
    public Aluguel entidade(AluguelDto dto){
    	Aluguel entidade = new Aluguel();

    	//entidade.setId(dto.getId());
    	entidade.setStatus(AluguelEnum.valueOf(dto.getStatus()));
    	entidade.setCarro(new Carro(dto.getPlaca()));
    	entidade.setCliente(new Cliente(dto.getCpf()));
        entidade.setData(dto.getData());
    	
        return entidade;
    }    
    
}
