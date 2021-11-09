import Head from 'next/head'
import { useSelector } from 'react-redux'

export default function MyHead(){
    const headItens = useSelector(state => state.head)
    
    return (
        <Head>
        <meta charset="UTF-8" />
        <title>{headItens.title}</title>
        <link rel="alternate" href={headItens.url} hreflang="pt-br" />
        <meta http-equiv="content-language" content="pt-br" />
        <meta name="description" itemprop="description" content={headItens.description} />
        <meta property="og:title" content={headItens.title} />
        <meta property="og:description" content={headItens.description} />
        <meta property="og:url" content={headItens.url} />
        <meta property="og:locale" content="pt-br" />
        <meta property="og:site_name" content="Portais Imobiliários" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon-precomposed" href="/images/favicon.png" />
        <link rel="icon" href="/images/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/images/favicon.png" type="image/vnd.microsoft.icon" />
        <meta name="author" content="POW Internet - http://www.powinternet.com/" />
        <meta http-equiv="expires" content="Wed, 08 Dec 21 14:40:04 -0300" />
        <meta http-equiv="Pragma" content="public" /> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#285384" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    )
}
