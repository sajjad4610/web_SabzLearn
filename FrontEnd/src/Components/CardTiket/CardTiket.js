import { Avatar, Badge } from "antd";
import React, { Children, useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import useContextUser from "../../ContextApi/UserContextApi";

export default function CardTiket(props) {
  const { isLogin, userInfo } = useContext(useContextUser);
  const [showReplay, setShowReplay] = useState(false);

  const SendComment = (
    id,
    replayTo,
    replayTiket,
    department,
    type,
    level,
    cours_name,
    send_email,
    title
  ) => {
    props.getDataHandelr(
      id,
      replayTo,
      replayTiket,
      department,
      type,
      level,
      cours_name,
      send_email,
      title
    );
  };
  const RemoveComentHandler = (id_Box, sender_id) => {
    props.RemoveHandler(id_Box, sender_id);
  };

  const ShowattachedHandler = (attached, description, ValueInputTitel) => {
    Swal.fire({
      title: ValueInputTitel,
      text: description,
      html: `      
         <a
      class="fa fa-download fs-2  text-info"
      href=${props.attached}
      target="_blank"
    ></a>`,
      imageUrl: attached,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };
  return (
    <Badge.Ribbon
      className={
        props.post_type !== "Main"
          ? "opacity-0"
          : userInfo.user.role === "admin"
          ? "opacity-100 mt-5"
          : "opacity-100 "
      }
      color={
        props.level === "کم" ? "cyan" : props.level === "زیاد" ? "pink" : "gold"
      }
      text={props.post_type === "Main" ? `اولویت ${props.level}` : ""}
    >
      <Card className="m-2">
        <Card.Header>
          <div className="row justify-content-between align-items-center  ">
            <div className="col">
              <div className="d-flex align-items-center">
                <Avatar className="me-5" src={props.sender_avatar} />
                <span className="fs-3 text-info fw-bold text-center">
                  {props.sender_name}
                </span>
              </div>
            </div>
            {isLogin && userInfo.user.role === "admin" ? (
              <div className="col d-flex justify-content-end">
                <button
                  className="btn btn-close"
                  onClick={() =>
                    RemoveComentHandler(props.id_Box, props.sender_id)
                  }
                ></button>
              </div>
            ) : null}
          </div>
        </Card.Header>
        <Card.Body>
          {props.post_type !== "Main" && (
            <Card.Title className="">{`در جواب : ${props.replay_description} (${props.reaply_to})`}</Card.Title>
          )}
          <Card.Text className="text-success fw-bold fs-3">
            {props.post_type === "Main" && `عنوان  : ${props.title}`}
          </Card.Text>
          <Card.Text className="text-dark fs-4">{props.description}</Card.Text>
          <div className="d-flex justify-content-end me-5">
            {isLogin && props.sender_id !== userInfo.user.userid && (
              <Button
                className=" btn btn-outline-info ps-4 pe-4"
                variant="light"
                onClick={() =>
                  SendComment(
                    props.id_coment,
                    props.sender_name,
                    props.description,
                    props.department,
                    props.type,
                    props.level,
                    props.cours_name,
                    props.send_email,
                    props.title
                  )
                }
              >
                پاسخ
              </Button>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="text-muted text-end">
          <div className="row">
            <div className="col text-start text-muted">{`${props.department} / ${props.type} / ${props.cours_name}`}</div>
            <div className="col text-muted text-end">{props.moment}</div>
          </div>
        </Card.Footer>
        {props.post_type === "Main" && (
          <Card.Footer className="text-muted bg-dark bg-opacity-10">
            <div className="row justify-content-between align-items-center">
              <div className="col">
                <Badge
                  count={props.numberReplay}
                  offset={[-40, 0]}
                  size="small"
                >
                  <button
                    className=" btn btn-outline-success fs-3 fa fa-comments "
                    onClick={() => setShowReplay((prev) => !prev)}
                  ></button>
                </Badge>
              </div>
              <div className="col d-flex justify-content-end">
                {props.attached ? (
                  <>
                    <button
                      title="دانلود و نمایش فایل پیوست"
                      className="fa fa-paperclip fs-2   btn border-0 btn-outline-danger"
                      onClick={() =>
                        ShowattachedHandler(
                          props.attached,
                          props.description,
                          props.ValueInputTitel
                        )
                      }
                    ></button>
                  </>
                ) : null}
              </div>
            </div>
            {showReplay &&
              Children.map(props.children, (child) => (
                <div className="Row">{child}</div>
              ))}
          </Card.Footer>
        )}
      </Card>
    </Badge.Ribbon>
  );
}
