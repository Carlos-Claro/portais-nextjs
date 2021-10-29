import { Container, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import Link from "next/link"

export default function Footer(props){
    return(<>
    
      <Container>
        <Box>
          <Typography variant="h4" >
          SOBRE Curitiba
          </Typography>
          <Typography variant="body1" >
          Curitiba é a capital e o centro econômico do estado do Paraná. Tem se consolidado como a cidade mais rica do sul do Brasil. Tornou-se conhecida pelas soluções urbanas diferenciadas, como por exemplo, o sistema integrado de transporte coletivo, que serve como agente do desenvolvimento urbano. Curitiba é a capital ecológica do país, recebe milhões de turistas durante o ano, porém, nos últimos tempos essas pessoas estão vindo para a capital paranaense de forma definitiva, o que vem aumentando drasticamente a procura por imóveis em Curitiba.
              <Link href="/">
                <a>
              Visite o site da Prefeitura de Curitiba
              </a>
              </Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" >
          O CURITIBANO
          </Typography>
          <Typography variant="body1" >
          Curitibano, o Portal icuritiba.com | Imóveis Curitiba divulga <a href="/imobiliarias/">imobiliárias</a> em Curitiba e região, é integrante da <a href="http://www.portaisimobiliarios.com.br/">rede Portais Imobiliários</a>, que reúne imobiliárias e imóveis em todo o Brasil. Acesse nossa <a href="estatistica">página de estatística</a> e veja os valores médios dos imóveis em Curitiba por tipo de imóvel e bairro.
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline">

            "Graça seja convosco, e paz, da parte de Deus nosso Pai, e do Senhor Jesus Cristo." 1CO 1:3<br />
            O sangue de Jesus Cristo, filho do Deus vivo, te purifica de todos os pecados.
          </Typography>
          <Typography variant="overline">
            <br />Copyright &copy; Orionweb informações e tecnologias.
            </Typography>
        </Box>
      </Container>
      
      </>
    );
  }
  
