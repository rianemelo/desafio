package br.com.stefanini.maratonadev.dto;


import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;


public class ClienteDto implements Serializable {
	
	//@UniqueElements(message = "CPF já cadastrado!")
	private Long cpf;

	@NotNull(message="Nome obrigatório!") 
	@NotBlank(message="Não permitido nome vazio!")
	@Length(min = 3, max = 100, message = "min 3 e max 100 caracteres!")
	private String nome;
	
	private String endereco;
	
	private String email;
	
	private String contato;
	
	//GETTERS AND SETTERS
	public Long getCpf() {
		return cpf;
	}
	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContato() {
		return contato;
	}
	public void setContato(String contato) {
		this.contato = contato;
	}

}
