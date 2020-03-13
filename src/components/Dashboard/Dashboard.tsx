import React, { useState, useEffect } from "react";
import Navbar from "./../Navbar/Navbar";
import {
  Timeline,
  Divider,
  Popover,
  Button,
  Modal,
  Input,
  DatePicker,
  message
} from "antd";
import Axios from "axios";
import { ip } from "../../utils/api";
import IEvenement from "../../interfaces/IEvenement";
import moment from "moment";

const Dashboard: React.FC = () => {
  const [evenement, setEvenement] = useState<IEvenement[]>([]);
  const [modal, setModal] = useState(false);
  const [nomEvenement, setNomEvenement] = useState("");
  const [descriptionEvenement, setDescriptionEvenement] = useState("");
  const [dateEvenement, setDateEvenement] = useState("");

  const getEvenement = async () => {
    let response = await Axios.get(`${ip}/evenement`);
    const dataEvenement: IEvenement[] = [];

    if (response.data) {
      for (let e of response.data) {
        dataEvenement.push({
          id: e[0],
          nom: e[1],
          description: e[2],
          date: e[3]
        });
      }
      setEvenement(dataEvenement);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addEvenement = async () => {
    let response = await Axios.post(`${ip}/evenement/new`, {
      nom: nomEvenement,
      description: descriptionEvenement,
      date: dateEvenement
    });
    if (response.data) {
      message.success("Votre évenement a bien été ajouté");
      getEvenement();
      setModal(false);
      setNomEvenement("");
      setDescriptionEvenement("");
      setDateEvenement("");
    }
  };

  const onChangeNomEvenement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomEvenement(event.target.value);
  };

  const onChangeDescriptionEvenement = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionEvenement(event.target.value);
  };

  const onChangeDateEvenement = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    setDateEvenement(dateString);
  };

  useEffect(() => {
    getEvenement();
  }, []);

  return (
    <div>
      <Navbar />
      <Divider
        orientation="center"
        style={{ color: "#333", fontWeight: "normal" }}
      >
        <h1 className="title">Dashboard</h1>
      </Divider>

      <Timeline style={{ marginLeft: "10%" }} mode="left">
        <Button onClick={openModal} style={{ marginBottom: "2%" }}>
          Ajouter un évenement
        </Button>

        {evenement &&
          evenement.map(e => (
            <Timeline.Item key={e.id}>
              <Popover
                placement="right"
                content={<div style={{ width: 800 }}> {e.description}</div>}
              >
                {e.nom} - <i>{new Date(e.date).toDateString()}</i>
              </Popover>
            </Timeline.Item>
          ))}
      </Timeline>

      <Modal
        title="Ajouter un évenement"
        visible={modal}
        onOk={addEvenement}
        onCancel={closeModal}
      >
        <Input
          style={{ marginBottom: "1%" }}
          placeholder="Nom de l'évenement"
          onChange={onChangeNomEvenement}
        />

        <Input
          style={{ marginBottom: "1%" }}
          placeholder="Description de l'évenement"
          onChange={onChangeDescriptionEvenement}
        />
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Date de l'évenement"
          onChange={onChangeDateEvenement}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
