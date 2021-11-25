import React, { useEffect } from "react"
import 'react-chat-elements/dist/main.css';
// https://www.npmjs.com/package/react-chat-elements
// https://github.com/detaysoft/react-chat-elements
import { ChatItem } from 'react-chat-elements';
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../src/uteis/ApiService";
import { MessageList } from 'react-chat-elements';
import Header from "../../src/components/Header";
import { Paper, Typography } from "@material-ui/core";
import Conversa from "../../src/components/Chat/conversa";
import ListaChat from "../../src/components/Chat/lista";

export default function MyChat (){
  const dispatch = useDispatch()
  const token = useSelector(state => state.carregamento.token)
  useEffect(() => {
    if ( ! token ){
      const item = new ApiService
      item.Auth().then(res => {
        dispatch(setToken(res.token))
      })
    }
  }, [])
  const chatCarregamento = useSelector(state => state.carregamento.chat)
  React.useEffect(() => {
    if (token){
      const item = new ApiService(token)
      item.Chat().then(res => {
        setChat(res)})
    }
  }, [])

  const [chat, setChat] = React.useState([])
  const [chatAtivo, setChatAtivo] = React.useState({})
  const [titulo, setTitulo] = React.useState('Lista de Conversas')
  const [isConversa, setIsConversa] = React.useState(false)
  const HandleChat = (item) => {
    setChatAtivo(item)
    setIsConversa(true)
  } 
    return (
        <>
        <Header />
        <Paper sx={{mt:"70px"}}>
            {
              isConversa 
              ? <Conversa item={chatAtivo} isConversa={(tipo) => setIsConversa(tipo)} />
              : <ListaChat chat={chat} HandleChat={(item) => HandleChat(item)} />
            }    
        </Paper>
        </>
    )
}