package br.com.stefanini.maratonadev.rest;

import br.com.stefanini.maratonadev.dto.CarroDto;
import br.com.stefanini.maratonadev.service.CarroService;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.opentracing.Traced;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("carro")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Traced
public class CarroRest {

    @Inject
    CarroService service;

    @GET
    @Operation(summary = "Listar carros.",
            description = "Listar carros: ano de compra, marca, modelo e placa.")
    @APIResponse(responseCode = "200",
            description = "carros",
            content = {
                    @Content(mediaType =  "application/json",
                            schema = @Schema(implementation = CarroDto.class))
            }
    )
    public Response listar(){
        return Response
                .status(Response.Status.OK)
                .entity(service.listar())
                .build();
    }
    
}
