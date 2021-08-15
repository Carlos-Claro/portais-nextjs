import React from "react"
import 'react-chat-elements/dist/main.css';
// https://www.npmjs.com/package/react-chat-elements
// https://github.com/detaysoft/react-chat-elements
import { ChatItem } from 'react-chat-elements';

export const ChatContent = () => [
    {
      id:1, 
      imobiliaria: 81881, 
      imobiliaria_logo: "https://pow.com.br/powsites/7695/8707094000145_logopeq.gif",
      imobiliaria_nome: "Powsites ficticio",
      imovel: 1,
      conversas:[
        {iterator: 0, message:"gostaria de mais informações sobre o imóvel 0001"},
        {iterator: 1, message:"estamos disponiveis para tirar suas duvidas"},
        {iterator: 1, message:"fique a vontade"}
      ]
    },
    {
      id:2, 
      imobiliaria: 81881, 
      imobiliaria_logo: "https://pow.com.br/powsites/84100/bcada1362b79cf623de9d5e3cdcab5f8.jpeg",
      imobiliaria_nome: "Powsites ficticio 2",
      imovel: 2,
      conversas:[
        {iterator: 0, message:"gostaria de mais informações sobre o imóvel 0002"},
        {iterator: 1, message:"estamos disponiveis para tirar suas duvidas"},
        {iterator: 0, message:"tem supermercados perto"},
        {iterator: 0, message:"Escola fundamental"},
        {iterator: 1, message:"Tem bantante comercio..."},
      ]
    }
  ]

export default function MyChat (){
    const [myChat, setMyChat] = React.useState(ChatContent)
    const HandleChat = (item) => {
      console.log(item);
    }
    const [chat, setChat] = React.useState(false)
    return (
        <div>
            {
              myChat.map((chat, index) => {
                  return (
                    <ChatItem
                      avatar={chat.imobiliaria_logo}
                      alt={chat.imobiliaria_nome}
                      title={`${chat.imobiliaria_nome}`}
                      subtitle={chat.conversas[chat.conversas.length - 1].message}
                      unread={0}
                      date={new Date()}
                      onClick={HandleChat(index)}
                      />
                    );
                })
              
            }    
        </div>
    )
}