import { IconButton, Paper, Stack, Typography } from "@material-ui/core";

import { getProviders, signIn  } from "next-auth/react";
import HeaderLogin from "../../src/components/Header/login"
import GoogleIcon from '@material-ui/icons/Google';
import GitHubIcon from '@material-ui/icons/GitHub';


export default function SignIn({ providers }){  
  
    return (
        <>
          <Stack sx={{p:1}}>
            <Paper sx={{p:1}}>
              <Typography>
                Escolha como fazer seu login
              </Typography>
            </Paper>
              {Object.values(providers).map((provider) => (
                <Paper key={provider.name} sx={{p:1}} onClick={() => signIn(provider.id)}>
                  <IconButton >
                    {
                      provider.id == 'google' 
                      ? <GoogleIcon />
                      : <GitHubIcon />
                    }
                  </IconButton>
                    Entrar com {provider.name}
                </Paper>
              ))}
          </Stack>
        </>
    )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}