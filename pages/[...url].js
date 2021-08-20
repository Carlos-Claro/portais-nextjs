import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from ".";
import { setURL } from "../src/store/Filtro/Filtro.actions";

export default function URL(){
  const dispatch = useDispatch()
  const router = useRouter()
  
  const parametros = useSelector(state => state.parametros);
  
  useEffect(() => {
    
    if ( router.isReady ) {
      console.log(router.query);
      dispatch(setURL(router.query['url'][0]))
    } 

  }, [router.isReady])  

  return <Home />;
}