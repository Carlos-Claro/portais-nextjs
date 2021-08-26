import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from ".";
import { setURL } from "../src/store/Filtro/Filtro.actions";


export default function URL(){
  const dispatch = useDispatch()
  const router = useRouter()
  const carregamento = useSelector(state => state.carregamento)
  
  const [home, setHome] = useState('')
  useEffect(() => {
    if ( router.isReady ) {
      dispatch(setURL(router.query['url'][0]))
      setHome(<Home />)
    }
  }, [router.isReady])  

  useEffect(() => {
    console.log(carregamento);
  }, [carregamento])

  return home;
}