package br.com.stefanini.maratonadev.model;


import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import java.util.List;

import javax.persistence.*;

/**
 * @author danilodorgam
 * @version 0.1.0
 * @created 29/10/2020 on 18:27
 */
@Entity
@Table(name = "carro")
public class Carro extends PanacheEntityBase {
    
	@Id
    private String placa;

    @Column(name = "ano")
    private int ano;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "marca")
    private String marca;

    @OneToMany(mappedBy="carro", cascade=CascadeType.ALL, orphanRemoval=true)
	private List<Aluguel> aluguel;
  
    
    public Carro() {
		super();
		
	}
    
    public Carro(String placa) {
		super();
		this.placa = placa;
	}



	//GETTERS AND SETTERS
    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

	public List<Aluguel> getAluguel() {
		return aluguel;
	}

	public void setAluguel(List<Aluguel> aluguel) {
		this.aluguel = aluguel;
	}
    

}
