import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { homeUrl } from "../../app/routes";

import Button from "../../components/Button";

const Base: React.FC = () => (
  <div className="homePage">
    <div className="mainHeading">
    </div><br />
    <Link to={homeUrl}>
    <Button>
      Continue Shopping
    </Button>
    </Link>
  </div>
);

export default Base;
