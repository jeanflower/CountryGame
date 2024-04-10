'use client'
import styles from "./page.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Header from "@/components/Header";
import { PageNames } from "@/interfaces/PageNames";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header 
        loading={false} 
        page={PageNames.Home}      
      />

      <Container
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
        }}>
        <Row>
          <Col>
            <h2
              style={{ textAlign: "center" }}
            >Usage stats</h2>
            <div>Credits used: xxx</div>
            <div>Some text here</div>
          </Col>
          <Col
            xs={6}
          >
            <h2
              style={{ textAlign: "center" }}
            >Recent Data</h2>
            <div
              className="d-flex justify-content-center"
            >
              <table
                className={styles.mytable}
              >
                <thead>
                  <tr>
                    <th>
                      Recent journeys
                    </th>
                    <th>
                      Recent path lengths
                    </th>
                    <th>
                      Recent game scores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mongolia-France</td>
                    <td>17 steps</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="text-center"
            >
              <div
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <img
                  src="/images/technologies.png"
                  width="200"
                  height="150"
                  className="d-inline-block align-top"
                  alt="Technologies"
                />
              </div>
            </div>
          </Col>
          <Col>
            <h2
              style={{ textAlign: "center" }}
            >
              Profile
            </h2>

            <div
              className="d-flex justify-content-center"
            >
              <table
                className={styles.mytable}
              >
                <thead>
                  <tr>
                    <th>
                      Team name
                    </th>
                    <th>
                      Player id
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>The bucaneers</td>
                    <td>jhg12ewjhg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>

    </main>
  );
}
