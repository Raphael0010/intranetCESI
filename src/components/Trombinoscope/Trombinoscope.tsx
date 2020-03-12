import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import Axios from "axios";
import { ip } from "../../utils/api";
import "./Trombinoscope.css";
import { ITrombinoscope } from "../../interfaces/Trombinoscope";
import { Card, Row, Col, Divider } from "antd";

const Trombinoscope: React.FC = () => {
  const [trombinoscope, setTrombinoscope] = useState<ITrombinoscope[]>([]);
  const { Meta } = Card;

  const getTrombinoscope = async () => {
    let response = await Axios.get(`${ip}/trombinoscope`);
    const dataTrombi: ITrombinoscope[] = [];

    if (response.data) {
      for (let e of response.data) {
        dataTrombi.push({
          id: e[0],
          nom: e[1],
          prenom: e[2],
          photo: e[3],
          promotion: e[4],
          annee: e[5]
        });
      }
      setTrombinoscope(dataTrombi);
    }
  };

  useEffect(() => {
    getTrombinoscope();
  }, []);

  return (
    <div>
      <Navbar />
      <Divider
        orientation="center"
        style={{ color: "#333", fontWeight: "normal" }}
      >
        <h1 className="title">Trombinoscope</h1>
      </Divider>
      <Row gutter={24}>
        {trombinoscope &&
          trombinoscope.map(e => (
            <Col className="gutter-row" span={4}>
              <Card
                key={e.id}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img width="200" height="200" alt={e.photo} src={e.photo} />
                }
              >
                <Meta
                  title={e.nom + " " + e.prenom}
                  description={e.promotion + " - " + e.annee}
                />
              </Card>
              <br />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Trombinoscope;