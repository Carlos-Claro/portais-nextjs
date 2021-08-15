import { useRouter } from "next/dist/client/router";
import { ChatContent } from "./index";
import { MessageList } from 'react-chat-elements';
import React from "react";


export default function ChatItem(){
    const router = useRouter()
    const {item} = router.query
    const [conversas, setConversas] = React.useState([
        {position: "left", type: "text", text: "gostaria de mais informações sobre o imóvel 0002", date: new Date()},
        {position: "right", type: "text", text: "estamos disponiveis para tirar suas duvidas", date: new Date()},
        {position: "left", type: "text", text: "tem supermercados perto", date: new Date()},
        {position: "left", type: "text", text: "Escola fundamental", date: new Date()},
        {position: "right", type: "text", text: "Tem bantante comercio...", date: new Date()},
    ])
    
    return (
        <>
    
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={conversas} 
    
            />
        </>
    )
}