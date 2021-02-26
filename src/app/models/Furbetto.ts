export interface IFurbetto {
  id: number;
  nome: string;
  nomeFurbetto: string;
  mail: string;
  strada: string;
  comune: string;
  provincia: string;
  lat: number;
  lng: number;
  info: string;
}

class Furbetto implements IFurbetto {
  id: number;
  nome: string;
  nomeFurbetto: string;
  mail: string;
  strada: string;
  comune: string;
  provincia: string;
  lat: number;
  lng: number;
  info: string;

  constructor(furbetto: IFurbetto) {
    this.id = furbetto.id;
    this.nome = furbetto.nome;
    this.nomeFurbetto = furbetto.nomeFurbetto;
    this.mail = furbetto.mail;
    this.strada = furbetto.strada;
    this.comune = furbetto.comune;
    this.provincia = furbetto.provincia;
    this.lat = furbetto.lat;
    this.lng = furbetto.lng;
    this.info = furbetto.info;
  }
}

export default Furbetto;
