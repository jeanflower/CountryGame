import { Container, Navbar } from "react-bootstrap";

export default function Footer() {
  return (
  <Navbar fixed="bottom">
    <Container fluid style={{
        textAlign: 'right',
        paddingRight: 100,
        background: "white",        
      }}>
        <a href='/privacy'>How we handle your data</a>{'  '}&copy;2024 myCountryGame
    </Container>
  </Navbar>
  );
}
