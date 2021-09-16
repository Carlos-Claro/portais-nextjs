/*
http://imoveis.powempresas.com/

endereco: "http://localhost:5000/",
endereco: "http://imoveis.powempresas.com/",
*/

class ApiService {
  
    constructor(token){
      var bearer = 'Bearer ' + token;
      this.endereco = "http://carlosclaro.ddns.net:5000/";
      this.headers = new Headers({
        'Authorization': bearer,
        'Content-Type': 'application/json'
      });
    }   

    Auth = async () => {
      const requestInfo = {
        method:'POST',
        headers: this.headers
      };
      let data = await fetch(`${this.endereco}auth` , requestInfo)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }

    QtdeImoveis = async (filtro) => {
      const requestInfo = {
        method:'GET',
        headers: this.headers
      };
      let data = await fetch(`${this.endereco}portal_qtde?${filtro}` , requestInfo)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
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
    getFavoritos = async (ids) => {
      const requestInfo = {
        method:'GET',
        headers: this.headers
      };
      let data = await fetch(`${this.endereco}portal_ids?ids=${ids.join(',')}` , requestInfo)
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
    GetBairros = async (cidade) => {
      let data = await fetch(`${this.endereco}get_bairros_por_cidade/${cidade}`)
      .then(res => this.TrataErros(res) )
      .then(data => data.json());
      return data;
    }
    GetImobiliarias = async (cidade) => {
      let data = await fetch(`${this.endereco}portal_empresas?cidade_link=${cidade}`)
      .then(res => this.TrataErros(res) )
      .then(data => data.json());
      return data;
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
  