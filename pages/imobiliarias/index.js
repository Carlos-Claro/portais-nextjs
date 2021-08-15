import React from "react";
import Header from "../../src/components/Header";


export default function Imobiliarias(){
    
    const [imobiliarias, setImobiliarias] = React.useState([]);
    React.useEffect(() => {
        
    },[]);

    return (
       <>
        <Header notImoveis={true} />
       </>
    )
}