package br.com.stefanini.maratonadev.service;

import br.com.stefanini.maratonadev.dao.CarroDao;
import br.com.stefanini.maratonadev.dto.AluguelDto;
import br.com.stefanini.maratonadev.dto.CarroDto;
import br.com.stefanini.maratonadev.dto.ClienteDto;
import br.com.stefanini.maratonadev.model.Aluguel;
import br.com.stefanini.maratonadev.model.Carro;
import br.com.stefanini.maratonadev.model.dominio.AluguelEnum;
import br.com.stefanini.maratonadev.model.parser.CarroParser;
import br.com.stefanini.maratonadev.model.parser.ClienteParser;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.NotAllowedException;
import javax.ws.rs.NotFoundException;

import org.eclipse.microprofile.opentracing.Traced;

import com.sun.istack.NotNull;


import java.util.List;
import java.util.stream.Collectors;


@RequestScoped
@Traced
public class CarroService {
    @Inject
    CarroDao dao;
    
    @Inject
    AluguelService aluguelService;

    public List<CarroDto> listar() {
        return dao.listar().stream().map(CarroParser.get()::dto).collect(Collectors.toList());
    }
    
    public CarroDto buscarPorPlaca(String placa){
		try {
			CarroDto carroDto = CarroParser.get().dto(dao.buscarPorPlaca(placa));
			return carroDto;
		} catch (NullPointerException e) {
			return null;
		}
		
    }
    
//    @Transactional //atualizar o status
//    public void atualizar(Long id, String placa) {
//    	Carro carroBanco = buscarCarroPorPlaca(placa);
//    	
//    	//List<Aluguel> aluguel = aluguelService.buscarAluguelPorPlaca(placa);
//    	
//    	
//     }
   
    
    public void isCarroFree(String placa) {
    	List<AluguelDto> aluguel = aluguelService.buscarAluguelPorPlaca(placa);
    	if ( aluguel.size() > 0 ) {
    		if ( aluguel.get(0).getStatus().equals("ON") ) {
        		throw new NotAllowedException("Carro atualmente alugado!");
        	}
		}
    }
    
}
