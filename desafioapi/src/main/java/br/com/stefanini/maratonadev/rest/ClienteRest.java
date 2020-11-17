package br.com.stefanini.maratonadev.rest;


import javax.inject.Inject;
import javax.validation.Validator;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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

import br.com.stefanini.maratonadev.dto.ClienteDto;
import br.com.stefanini.maratonadev.service.ClienteService;

@Path("cliente")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Traced
public class ClienteRest {

	@Inject
    ClienteService service;
	
	@Inject
	Validator validator;
	
	@GET
    @Operation(summary = "Listar clientes.",
            description = "Listar clientes: contato, cpf, email, endereço e nome.")
    @APIResponse(responseCode = "200",
            description = "clientes",
            content = {
                    @Content(mediaType =  "application/json",
                            schema = @Schema(implementation = ClienteDto.class))
            }
    )
    public Response listar(){
        return Response
                .status(Response.Status.OK)
                .entity(service.listar())
                .build();
    }

	@POST
	@Path("")
	@Operation(summary = "Cadastrar um cliente.",
	description = "Cadastrar um cliente: contato, cpf, email, endereço e nome.")
	@APIResponse(responseCode = "201",
	description = "cliente",
	content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = ClienteDto.class))
			}
	)
	public Response inserir(ClienteDto cliente) {
		service.inserir(cliente);
		return Response
				.status(Response.Status.CREATED)
				.build();
	}
	
	@DELETE
	@Path("/{cpf}")
	@Operation(summary = "Excluir cliente.",
	description = "Excluir um cliente pelo seu CPF.")
	@APIResponse(responseCode = "202",
	description = "cliente",
	content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = ClienteDto.class))
			}
	)
	public Response excluir(@PathParam("cpf") Long cpf) {
		service.excluir(cpf);
		return Response
				.status(Response.Status.ACCEPTED)
				.build();
	}
	
}