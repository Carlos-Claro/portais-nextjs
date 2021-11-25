import React, { useEffect } from "react";
import { Avatar, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { Button, Input, MessageList, SideBar } from "react-chat-elements";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from "react-redux";
import ApiService from "../../uteis/ApiService";


export default function Conversa(props){
    const [conversas, setConversas] = React.useState([])
    useEffect(() => {
        setConversas(props.item.interacao.map((i,x) => {
          if (i.autor == 'usuario'){
            return {position: "right", type: "text", text: i.message, date: new Date(i.date)}
          }else{
            return {position: "left", type: "text", text: i.message, date: new Date(i.date)}
          }
        }))
    }, [props.item])
    const token = useSelector(state => state.carregamento.token)
    const addMessage = () => {
        const dataAdd = {message: inputRef.state.value, id_imovel:props.item.id_imovel }
        const item = new ApiService(token)
        item.ChatAdd(dataAdd).then(res => {
            if (res.status){
                setConversas(res.interacao.map((i,x) => {
                    if (i.autor == 'usuario'){
                      return {position: "right", type: "text", text: i.message, date: new Date(i.date)}
                    }else{
                      return {position: "left", type: "text", text: i.message, date: new Date(i.date)}
                    }
                  }))
            }
        })
        inputRef.clear()
    }
    let inputRef = React.createRef();
    return (
        <>
            <Paper>
                <Grid container spacing={1}>
                    <Grid item xs={2} >
                        <Avatar alt={props.item.imovel.nome} src={props.item.imovel.images[0].arquivo} />
                    </Grid>
                    <Grid item xs={8} >
                        <Typography noWrap>{props.item.imovel.nome}</Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton onClick={() => props.isConversa(false)}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={conversas} 
                />
            <Input
            placeholder="Digite sua mensagem..."
            autofocus={true}
            multiline={true}
            ref={el => (inputRef = el)}

            onKeyPress={(e) => {
                if (e.shiftKey && e.charCode === 13) {
                    return true;
                }
                if (e.charCode === 13) {
                    addMessage();
                    e.preventDefault();
                    return false;
                }
            }}
            rightButtons={
                <Button
                    color='white'
                    backgroundColor='black'
                    onClick={() => addMessage()}
                    text='Enviar' />
            }/>
      </>
    )
}