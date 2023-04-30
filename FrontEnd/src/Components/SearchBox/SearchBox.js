import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SearchBox.css";
export default function SearchBox() {
  const [InputSearchVlue, setInputSearchVlue] = useState("");

  return (
    <div className="landing__searchbar ms-0 me-0 w-100">
      <InputGroup>
        <Link to={InputSearchVlue && `/sherch/${InputSearchVlue}`}>
          <Button
            id="button-addon1"
            className=" bg-info btn_search btn_search p-3 "
            variant="outline-success"
          >
            <i className="fa fa-search landing__searchbar-icon"></i>
          </Button>
        </Link>
        <Form.Control
          className="pt-4 pb-4 inputSearch"
          size="lg"
          type="search"
          value={InputSearchVlue}
          onChange={(event) => setInputSearchVlue(event.target.value)}
          placeholder="چی میخوایی یاد بگیری ؟"
        />
      </InputGroup>
    </div>
  );
}
