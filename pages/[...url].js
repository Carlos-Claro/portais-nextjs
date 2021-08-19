import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from ".";
import { setURL } from "../src/store/Filtro/Filtro.actions";

export default function URL(){
  const dispatch = useDispatch()
  const router = useRouter()
  const {url} = router.query
  
  const parametros = useSelector(state => state.parametros);
  
  useEffect(() => {
    console.log(url);
    dispatch(setURL(url))
    console.log(parametros);

  }, [])

  return <Home />;
}