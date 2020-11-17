package br.com.stefanini.maratonadev.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.validation.constraints.NotNull;


public class AluguelDto implements Serializable {
	
	private Long id;
	
	private String status; //o último status no DB
	
	@NotNull(message="Placa do carro é obrigatótrio")
	private String placa;
	
	@NotNull(message="Cpf do cliente é obrigatótrio")
	private Long cpf;
	
	@JsonbDateFormat("dd/MM/yyyy HH:mm")
	private LocalDateTime data;

	//GETTERS AND SETTERS
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPlaca() {
		return placa;
	}
	public void setPlaca(String placa) {
		this.placa = placa;
	}
	public Long getCpf() {
		return cpf;
	}
	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}
	public LocalDateTime getData() {
		return data;
	}
	public void setData(LocalDateTime data) {
		this.data = data;
	}

}
