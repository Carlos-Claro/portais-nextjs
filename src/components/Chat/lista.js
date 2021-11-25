
import { ChatItem } from "react-chat-elements";


export default function ListaChat(props){

    
    return (
        props.chat.map((c, index) => {
            return (
              <ChatItem
                avatar={c.imovel.images[0].arquivo}
                alt={c.imovel.nome}
                title={`${c.imovel.nome}`}
                subtitle={c.interacao[c.interacao.length - 1].message}
                unread={1}
                date={new Date(c.interacao[c.interacao.length - 1].date)}
                onClick={() => props.HandleChat(c)}
                />
              );
          })
    )
}