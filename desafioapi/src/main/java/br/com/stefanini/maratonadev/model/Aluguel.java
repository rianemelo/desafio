package br.com.stefanini.maratonadev.model;


import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import br.com.stefanini.maratonadev.model.dominio.AluguelEnum;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@Table(name = "aluguel")
public class Aluguel extends PanacheEntity {
	
	@Column(name="status", nullable=false)
	@Enumerated(EnumType.STRING)
	private AluguelEnum status;

	@Column(name="data", nullable=false, updatable=false)
	@CreationTimestamp
	private LocalDateTime data;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="carro_id", updatable=false)
	private Carro carro;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="cliente_id", updatable=false)
	private Cliente cliente;
	

	//GETTERS AND SETTERS
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public AluguelEnum getStatus() {
		return status;
	}
	public void setStatus(AluguelEnum status) {
		this.status = status;
	}
	public Carro getCarro() {
		return carro;
	}
	public void setCarro(Carro carro) {
		this.carro = carro;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public LocalDateTime getData() {
		return data;
	}
	public void setData(LocalDateTime data) {
		this.data = data;
	}
	
}
