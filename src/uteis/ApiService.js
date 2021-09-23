import useSWR from 'swr'

/*
http://imoveis.powempresas.com/

endereco: "http://localhost:5000/",
endereco: "http://imoveis.powempresas.com/",
*/

class ApiService {
  
    constructor(token){
      var bearer = 'Bearer ' + token;
      this.endereco = "http://carlosclaro.ddns.net:5000/";
      const headers = new Headers({
        'Authorization': bearer,
        'Content-Type': 'application/json'
      });
      this.requestInfoGet = {
        method:'GET',
        headers: headers
      }
      this.requestInfoPost = {
        method:'POST',
        headers: headers
      }
    }   

    Cadastro = async (complemento) => {
      
      this.requestInfoPost['body'] = JSON.stringify(complemento)
      let data = await fetch(`${this.endereco}auth_cadastro` , this.requestInfoPost)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    
    AtualizaToken = async (complemento) => {
      this.requestInfoPost['body'] = JSON.stringify(complemento)
      let data = await fetch(`${this.endereco}atualiza_token` , this.requestInfoPost)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }

    Auth = async (complemento) => {
      this.requestInfoPost['body'] = JSON.stringify(complemento)
      let data = await fetch(`${this.endereco}auth` , this.requestInfoPost)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }

    RegistraLog = async (id_imovel, tipo) => {
      this.requestInfoPost['body'] = JSON.stringify({id:id_imovel, tipo:tipo})
      let data = await fetch(`${this.endereco}registra_log` , this.requestInfoPost)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }

    QtdeImoveis = async (filtro) => {
      let data = await fetch(`${this.endereco}portal_qtde?${filtro}` , this.requestInfoGet)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    tituloQtdeImoveis = async (filtro) => {
      
      let data = await fetch(`${this.endereco}portal_main?${filtro}` , this.requestInfoGet)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    getFavoritos = async (ids) => {
      let data = await fetch(`${this.endereco}portal_ids?ids=${ids.join(',')}` , this.requestInfoGet)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    ListaImoveis = async (filtro) => {
      let data = await fetch(`${this.endereco}imoveismongo?${filtro}` , this.requestInfoGet)
                .then( res => this.TrataErros(res))
                .then(data => data.json());
      return data;
    }
    Imovel = _id => {
      return fetch(`${ApiService.endereco}imoveismongo/${_id}` , this.requestInfoGet)
      .then(res => ApiService.TrataErros(res))
      .then(data => data.json());
    }
    GetCidade = host => {
      return fetch(`${ApiService.endereco}get_cidade/?dominio=${host}`, this.requestInfoGet)
      .then(res => ApiService.TrataErros(res) )
      .then(data => data.json());
    }
    GetBairros = async (cidade) => {
      let data = await fetch(`${this.endereco}get_bairros_por_cidade/${cidade}`, this.requestInfoGet)
      .then(res => this.TrataErros(res) )
      .then(data => data.json());
      return data;
    }
    GetImobiliarias = async (cidade) => {

      
      let data = await fetch(`${this.endereco}portal_empresas?cidade_link=${cidade}`, this.requestInfoGet)
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
  