/*
http://imoveis.powempresas.com/

endereco: "http://localhost:5000/",
endereco: "http://imoveis.powempresas.com/",
*/
class ApiService {
    constructor(){
      this.endereco = "http://192.168.0.106:5000/";
      this.headers = new Headers({'Content-Type': 'application/json'});
    }   
    tituloQtdeImoveis = async (filtro) => {
      const requestInfo = {
        method:'GET',
        headers: this.headers
      };
      let data = await fetch(`${this.endereco}portal_main?${filtro}` , requestInfo)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    ListaImoveis = async (filtro) => {
      const requestInfo = {
        method:'GET',
        headers: this.headers
      };
      let data = await fetch(`${this.endereco}imoveismongo?${filtro}` , requestInfo)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    Imovel = _id => {
  
      const requestInfo = {
        method:'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };
      return fetch(`${ApiService.endereco}imoveismongo/${_id}` , requestInfo)
      .then(res => ApiService.TrataErros(res))
      .then(data => data.json());
    }
    GetCidade = host => {
      return fetch(`${ApiService.endereco}get_cidade/?dominio=${host}`)
      .then(res => ApiService.TrataErros(res) )
      .then(data => data.json());
    }
    TrataErros = res => {
      if ( ! res.ok ){
        throw new Error('erro fetch');
      }
      return res;
    }
    GetImages = async (img) => {
      const myHeaders = new Headers();
      const myRequest = new Request(img, {
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default',
      });
      const res = fetch(myRequest);
      await res.then(response => response.blob())
      .then(myBlob => {
        return URL.createObjectURL(myBlob);
      })
      .catch(error => {
        console.error('TProblemas para carregar imagem  :', error);
      });
  
    }
  }
  export default ApiService;
  