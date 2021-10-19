import { Container, Divider } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../src/components/Footer";
import HeaderImovel from "../../src/components/Header/imovel";
import ImovelItem from "../../src/components/Imoveis/imovelItem";
import Loading from "../../src/components/Loading";
import ApiService from "../../src/uteis/ApiService";



export default function URL(){
    const router = useRouter()
    const dispatch = useDispatch()
    const [imovel, setImovel] = useState(<Loading titulo="Imóvel" />)
    const token = useSelector(state => state.carregamento.token)
    useEffect(() => {
        if ( ! token ){
          const item = new ApiService
          item.Auth().then(res => dispatch(setToken(res.token)))
        }
      }, [])
    useEffect(() => {
        if ( router.isReady ) {
            if ( token ){
                const item = new ApiService(token)
                item.Imovel(router.query['url'][1]).then(res => setImovel(<ImovelItem imovel={res} />))
            }
        }
      }, [router.isReady, token]) 

    return (
        <>
        <Container>
            <HeaderImovel  />  
            <Divider sx={{mt:"70px"}} />
            {imovel}
            <Footer />
            
        </Container>
        </>
    );
}
