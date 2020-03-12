import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  PictureOutlined,
  BookOutlined,
  PoweroffOutlined,
  UserOutlined
} from "@ant-design/icons";
import cesi from "../../assets/cesi.png";
import { logout, getUser } from "../../utils/login";
const Navbar: React.FC = () => {
  let history = useHistory();
  const [username, setUsername] = useState("N/A");
  const deconnexion = () => {
    logout();
    history.replace("/");
  };

  useEffect(() => {
    let user = getUser();
    if (user) {
      setUsername(user);
    }
  }, [username]);
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item>
          <img height="40" width="130" alt="cesi" src={cesi} />
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard">
            <HomeOutlined style={{ marginRight: "5px" }} />
            Accueil
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/trombinoscope/">
            <PictureOutlined style={{ marginRight: "5px" }} />
            Trombinoscope
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/publication/">
            <BookOutlined style={{ marginRight: "5px" }} />
            Publication
          </Link>
        </Menu.Item>

        <Menu.Item style={{ float: "right" }} onClick={deconnexion}>
          <PoweroffOutlined style={{ marginRight: "5px" }} />
          Déconnexion
        </Menu.Item>
        <Menu.Item style={{ float: "right" }}>
          <UserOutlined style={{ marginRight: "5px" }} />
          {username}
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Navbar;
