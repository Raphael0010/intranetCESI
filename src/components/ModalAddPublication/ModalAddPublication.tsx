import React, { useState } from "react";
import { Button, Input, Modal, message, DatePicker } from "antd";
import { ip } from "../../utils/api";
import axios from "axios";

import moment from "moment";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  reloadList: () => void;
}

const ModalAddPublication: React.FC<Props> = ({
  visible,
  setVisible,
  reloadList
}) => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [date, setDate] = useState(Date);

  const onChangePrenom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrenom(event.target.value);
  };
  const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const createPublication = () => {
    axios
      .post(`${ip}/publication/new`, {
        titre: prenom,
        texte: nom,
        date: date
      })
      .then(e => {
        if (e.data) {
          message.success("Publication ajoutée");
          setVisible(false);
          reloadList();
        }
      });
  };

  const onChange = (date: moment.Moment | null, dateString: string) => {
    setDate(dateString);
  };
  const handleCancel = () => {
    setVisible(false);
    reloadList();
  };

  return (
    <div>
      <Modal
        title="Ajouter une publication"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <div>
            <Button onClick={handleCancel}>Fermer</Button>
            <Button type="primary" onClick={createPublication}>
              Ajouter
            </Button>
          </div>
        }
      >
        <Input
          style={{ marginBottom: "1%" }}
          placeholder="Titre de la publication"
          onChange={onChangePrenom}
        />

        <Input
          style={{ marginBottom: "1%" }}
          placeholder="Contenu de la publication"
          onChange={onChangeNom}
        />

        <DatePicker
          placeholder="Date de la publication"
          onChange={onChange}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default ModalAddPublication;
