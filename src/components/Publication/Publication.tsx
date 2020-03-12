import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import { Collapse } from 'antd';
import { ip } from "../../utils/api";
import { IPublication } from "./../Publication/IPublication";
import axios from "axios";
import "./../Publication/Publication.css"

const Publication: React.FC = () => {

  const { Panel } = Collapse;

  const [informations, setInformations] = useState<IPublication[]>([]);

  useEffect(() => {
    getPublication();
  },[]);

  const getPublication = async () => {
    let request = await axios.get(`${ip}/publication`, {})
    const data: IPublication[] = [];

    if (request.data) {
      for (let e of request.data) {
        data.push({
          id: e[0],
          titre: e[1],
          texte: e[2],
          date: e[3]
        })
      };
    }
    setInformations(data);
  };

  return (
    <div>
      <Navbar />
      <h1 className="title">Publication</h1>
      {informations &&
          informations.map(e => ((
            <Collapse defaultActiveKey={['1','2','3']} key={e.id}>
              <Panel header={e.titre} key={e.id}>
                <p>{e.texte}</p>
              </Panel>
            </Collapse>
         )))}
    </div>
  );
};

export default Publication;
