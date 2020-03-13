import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import { Collapse } from "antd";
import { ip } from "../../utils/api";
import { IPublication } from "../../interfaces/IPublication";
import axios from "axios";
import "./../Publication/Publication.css";
import { Divider, Button } from "antd";
import ModalAddPublication from "../ModalAddPublication/ModalAddPublication";

const Publication: React.FC = () => {
  const { Panel } = Collapse;

  const [informations, setInformations] = useState<IPublication[]>([]);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);

  useEffect(() => {
    getPublication();
  }, []);

  const getPublication = async () => {
    let request = await axios.get(`${ip}/publication`, {});
    const data: IPublication[] = [];

    if (request.data) {
      for (let e of request.data) {
        data.push({
          id: e[0],
          titre: e[1],
          texte: e[2],
          date: e[3]
        });
      }
    }
    setInformations(data);
  };

  const reloadList = () => {
    getPublication();
  };

  const showModalAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisibleModalAdd(true);
  };

  return (
    <div>
      <Navbar />
      <Divider
        orientation="center"
        style={{ color: "#333", fontWeight: "normal" }}
      >
        <h1 className="title">Publication</h1>
      </Divider>
      <div style={{ marginLeft: "10%", marginBottom: "2%" }}>
        <Button onClick={showModalAdd}>Ajouter une publication</Button>
      </div>
      {informations &&
        informations.map(e => (
          <Collapse defaultActiveKey={["1", "2", "3"]} key={e.id}>
            <Panel header={e.titre} key={e.id}>
              <i>
                {e.date.split(" ")[1] +
                  " " +
                  e.date.split(" ")[2] +
                  " " +
                  e.date.split(" ")[3]}
              </i>
              <p>{e.texte}</p>
            </Panel>
          </Collapse>
        ))}

      <ModalAddPublication
        visible={visibleModalAdd}
        setVisible={setVisibleModalAdd}
        reloadList={reloadList}
      />
    </div>
  );
};

export default Publication;
