import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Input, Alert } from "antd";
import axios from "axios";
import { ip } from "../../utils/api";
import { logged, storeUser } from "../../utils/login";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  let history = useHistory();
  const [stateModal] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const login = async () => {
    let request = await axios.post(`${ip}/login`, {
      user: username,
      password: password
    });

    if (request.data === "True") {
      logged();
      storeUser(username);
      history.replace("/dashboard");
    } else {
      setErrorMessage(true);
    }
  };

  const onSetUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Modal
        footer={[
          <Button key="submit" type="primary" onClick={login}>
            Connexion
          </Button>
        ]}
        title="Connexion"
        closable={false}
        visible={stateModal}
      >
        {errorMessage && (
          <Alert
            closable={true}
            style={{ marginBottom: "5px" }}
            message="Identifiant ou mot de passe incorrect"
            type="error"
          />
        )}
        <Input
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={onSetUsername}
          prefix={<UserOutlined className="site-form-item-icon" />}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Mot de passe"
          value={password}
          type="password"
          onChange={onSetPassword}
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Modal>
    </div>
  );
};

export default Login;
