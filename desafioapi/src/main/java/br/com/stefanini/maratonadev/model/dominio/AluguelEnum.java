package br.com.stefanini.maratonadev.model.dominio;

public enum AluguelEnum {

	ON("Aluguel ativo"),
	OFF("Aluguel terminado");
	
	private String descricao;
	
	AluguelEnum(String descricao){
		this.descricao = descricao;
	}
	
	public static Boolean isInvalido(String teste) {
		for(AluguelEnum status: AluguelEnum.values()) {
			if(status.name().equals(teste)) {
				return Boolean.FALSE;
			}
		}
		return Boolean.TRUE;		
	}
	
	
}
