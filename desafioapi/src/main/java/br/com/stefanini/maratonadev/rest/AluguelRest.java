package br.com.stefanini.maratonadev.rest;


import javax.inject.Inject;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.opentracing.Traced;

import br.com.stefanini.maratonadev.dto.AluguelDto;
import br.com.stefanini.maratonadev.service.AluguelService;


@Path("aluguel")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Traced
public class AluguelRest {

	
	@Inject
	AluguelService service;
	
	@Inject
	Validator validator;
	
	@GET
    @Operation(summary = "Listar aluguéis.",
            description = "Listar todos os  aluguéis.")
    @APIResponse(responseCode = "200",
            description = "aluguel",
            content = {
                    @Content(mediaType =  "application/json",
                            schema = @Schema(implementation = AluguelDto.class))
            }
    )
    public Response listar() {
        return Response
                .status(Response.Status.OK)
                .entity(service.listar())
                .build();
    }
	
	@GET
	@Path("/placa/{placa}")
	@Operation(summary = "Buscar aluguéis de um carro pela sua placa.",
	description = "Histórico dos aluguéis de um carro.")
	@APIResponse(responseCode = "200",
	description = "aluguel",
	content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = AluguelDto.class))
			}
	)
	public Response buscarAluguelPorPlaca(@PathParam("placa") String placa) {
		return Response
				.status(Response.Status.OK)
				.entity(service.buscarAluguelPorPlaca(placa))
				.build();
	}
	
	@GET
	@Path("/cpf/{cpf}")
	@Operation(summary = "Buscar os aluguéis de um cliente pelo seu CPF.",
	description = "Histórico dos aluguéis de um cliente.")
	@APIResponse(responseCode = "200",
	description = "aluguel",
	content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = AluguelDto.class))
			}
	)
	public Response buscarAluguelPorCpf(@PathParam("cpf") Long cpf) {
		return Response
				.status(Response.Status.OK)
				.entity(service.buscarAluguelPorCpf(cpf))
				.build();
	}
		
	@POST
	@Path("")
	@Operation(summary = "Cadastrar um aluguel: cpf do cliente, placa do carro.",
	description = "Cadastrar um aluguel.")
	@APIResponse(responseCode = "201",
	description = "aluguel",
	content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = AluguelDto.class))
			}
	)
	public Response inserir(AluguelDto aluguelDto) {
		service.inserir(aluguelDto);
		return Response
				.status(Response.Status.CREATED)
				.build();
	}
	
}
