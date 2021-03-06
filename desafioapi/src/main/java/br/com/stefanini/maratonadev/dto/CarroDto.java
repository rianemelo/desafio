package br.com.stefanini.maratonadev.dto;

import java.io.Serializable;

/**
 * @author danilodorgam
 * @version 0.1.0
 * @created 29/10/2020 on 18:33
 */
public class CarroDto implements Serializable {

    private String placa;

    private int ano;

    private String modelo;

    private String marca;
    
    private String status; //último status no DB

    
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
}
