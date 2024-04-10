import { PageNames, makePageString } from "@/interfaces/PageNames";
import styles from "../app/page.module.css";
import { Navbar, Container, Row, Col, Nav, Button } from "react-bootstrap";

type HeaderProps = {
  loading: boolean,
  page: PageNames,
}

function makeNavLink(
  linkPage: PageNames,
  currentPage: PageNames,
) {
  return (
    <div className={currentPage === linkPage ? styles.nav_highlighted_link : styles.nav_link}>
      {makePageString(linkPage)}
    </div>
  );
}

const Header = ({
  loading,
  page,
}: HeaderProps) => {
  // console.log(`in Header, page = ${makePageString(page)}`)

  return (<>
  <Navbar
    expand="lg"
  >
    <Navbar.Brand href="/">
      <Container
        fluid
        style={{ verticalAlign: 'bottom' }}
      >
        <Row className="text-wrap">
          <Col
            xs={"auto"}
          >
            <img
              src="/images/game-wide-logo.png"
              width="400"
              height="80"
              className="d-inline-block align-top"
              alt="Game logo"
            />
          </Col>
          <Col style={{
            fontSize: "150%",
            display: "block",
          }}>
            Country game - an exploration in global pathways
          </Col>
        </Row>
      </Container>
    </Navbar.Brand>
  </Navbar>

  <Navbar 
    bg="dark"
    data-bs-theme="dark"
    className="justify-content-between"
  >
      <Nav className="me-auto">
          <div
            style={{
              paddingLeft: "10px"
            }}
          />

          <Nav.Link id='nav-home' href='/'>
            {makeNavLink(PageNames.Home, page)}
          </Nav.Link>
          <Nav.Link id='nav-games' href='/games'>
            {makeNavLink(PageNames.Games, page)}
          </Nav.Link>
          <Nav.Link id='nav-play' href='/play'>
            {makeNavLink(PageNames.Play, page)}
          </Nav.Link>
          <Nav.Link id='nav-settings' href='/settings'>
            {makeNavLink(PageNames.Settings, page)}
          </Nav.Link>
          <Nav.Link id='nav-help' href='/help'>
            {makeNavLink(PageNames.Help, page)}
          </Nav.Link>
        </Nav> 
      <div
        style={{
          paddingRight: "10px"
        }}
      >
        <Button type="submit">Log out</Button>
      </div>
  </Navbar>
  </>
  );
}

export default Header;