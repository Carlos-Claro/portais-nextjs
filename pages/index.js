import Header from '../src/components/Header'
import styled from 'styled-components'
import Footer from '../src/components/Footer'
import { Container } from '@material-ui/core';
import Lista from '../src/components/Lista';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
  return (
    <Container>
      <Header />
      <Lista />
      <Footer />
    </Container>
  );
}
