import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";

import "./NavBar.css";
export default function NavComp({ sticky }) {
  const [showNavDropdown, setShowNavDropdown] = useState(false);
  const [fatherMenue, setFatherMenue] = useState([]);
  const [childMenue, setChildMenue] = useState([]);
  const [InputSearchVlue, setInputSearchVlue] = useState("");

  const showOverlayTrigger = () => {
    setShowNavDropdown((prev) => !prev);
  };

  useEffect(() => {
    GetServises(GetApi.MenuseApi).then((result) => {
      let filterFather = result.filter((e) => e.parent === "__");
        let filterChild = result.filter((e) => e.parent !== "__");
        setFatherMenue(filterFather);
        setChildMenue(filterChild);
    });

 

  }, []);


  return (
    <>
      <Navbar
        sticky={sticky ? "top" : null}
        bg="light"
        expand={"xl"}
        className=" swiper-slide-shadow-bottom shadow w-100  "

      >
        <Container fluid>
          <Link to="/">
            <img src="../../images/logo/Logo.png" alt="" />
          </Link>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-xl`}
            onClick={showOverlayTrigger}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"lg"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton onClick={showOverlayTrigger}>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xl"}`}>
                منو
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="d-flex justify-content-around  align-items-center col-xl-5 order-xl-1  ">
                <InputGroup>
                <Link to={InputSearchVlue &&`/sherch/${InputSearchVlue}`}>
                  <Button
                    id="button-addon1"
                    className="fa fa-search fs-2  btn_search p-2"
                    variant="outline-success"
                  ></Button>
                  </Link>
                  <Form.Control
                    className="pt-2 pb-2 inputSearch"
                    value={InputSearchVlue}
                    onChange={(event) => setInputSearchVlue(event.target.value)}
                    size="lg"
                    type="search"
                    placeholder="جستجو"
                  />
                </InputGroup>

                <ShoppingCart></ShoppingCart>
              </Form>

              <Nav className="justify-content-start pe-1 col-xl-7">
                {fatherMenue.map((father) => {
                  return (
                    <NavDropdown
                      key={father._id}
                      title={father.namefather}
                      id="navbarScrollingDropdown"
                      className={
                        !showNavDropdown ? "NavDropdownHover m-3" : "m-3"
                      }
                      renderMenuOnMount={true}
                    >
                      {childMenue.map(
                        (child) =>
                          child.parent === father.namefather && (
                            <Link
                              key={child._id}
                              className="text-decoration-none dropdown-item "
                              to={child.linkchild}
                            >
                              {child.namechild}
                            </Link>
                          )
                      )}
                      {father.namefather !== "فروشگاه" &&
                        father.namefather !== "درباره ما" && (
                          <>
                            <NavDropdown.Divider />
                            <Link
                              className="text-decoration-none dropdown-item fw-bolder text-info"
                              to={father.linkfather}
                            >
                              {`همه ی ${
                                father.namefather !== "مقالات" ? "دوره های" : ""
                              } ${father.namefather}`}
                            </Link>
                          </>
                        )}
                    </NavDropdown>
                  );
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
