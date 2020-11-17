package br.com.stefanini.maratonadev.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;


@Entity
@Table(name="cliente")
public class Cliente extends PanacheEntityBase {
	
	@Id
	private Long cpf;

	@Column(name="nome", nullable=false, length=100)
	private String nome;
	
	@Column(name="endereco")
	private String endereco;
	
	@Column(name="email")
	private String email;
	
	@Column(name="contato")
	private String contato;
	
	@OneToMany(mappedBy="cliente", cascade=CascadeType.ALL, orphanRemoval=true)
	private List<Aluguel> aluguel;

	//CONSTRUCTORS
	public Cliente() {
		super();
	}
	
	public Cliente(Long cpf) {
		super();
		this.cpf = cpf;
	}

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

	public List<Aluguel> getAluguel() {
		return aluguel;
	}

	public void setAluguel(List<Aluguel> aluguel) {
		this.aluguel = aluguel;
	} 
	
		
}
