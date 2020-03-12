import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  PictureOutlined,
  BookOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import cesi from "../../assets/cesi.png";

const Navbar: React.FC = () => {
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
        <Menu.Item style={{ float: "right" }}>
          <Link to="/logout/">
            <PoweroffOutlined style={{ marginRight: "5px" }} />
            Déconnexion
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Navbar;
