import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from ".";
import { setURL } from "../src/store/Filtro/Filtro.actions";

export default function URL(){
  const dispatch = useDispatch()
  const router = useRouter()
  const carregamento = useSelector(state => state.carregamento)

  useEffect(() => {
    if ( router.isReady ) {
      dispatch(setURL(router.query['url'][0]))
    } 

  }, [router.isReady])  

  useEffect(() => {
    console.log(carregamento);
  }, [carregamento])

  return <Home />;
}