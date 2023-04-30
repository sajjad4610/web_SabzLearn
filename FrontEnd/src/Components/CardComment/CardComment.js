import { Avatar, Badge } from "antd";
import React, { Children, useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import useContextUser from "../../ContextApi/UserContextApi";

export default function CardComment(props) {
  const { isLogin, userInfo } = useContext(useContextUser);
  const [showReplay, setShowReplay] = useState(false);

  const SendComment = (id, replayTo, replayComment) => {
    props.getDataHandelr(id, replayTo, replayComment);
  };
const RemoveComentHandler=(id_Box , id_user) => {
  props.RemoveHandler(id_Box ,id_user)
}
  return (
    <Card className="m-2">
      <Card.Header>
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <Avatar className="me-5" src={props.avatar} />
              <span className="fs-3 text-success text-center">
                {props.name_user}
              </span>
            </div>
          </div>
          {isLogin && userInfo.user.role === "admin" ? (
            <div className="col d-flex justify-content-end">
              <button className="btn btn-close" onClick={()=> RemoveComentHandler(props.id_Box ,props.id_user)}></button>
            </div>
          ) : null}
        </div>
      </Card.Header>
      <Card.Body>
        {props.type !== "main" && (
          <Card.Title>{`در جواب : ${props.replayComment} (${props.replayTo})`}</Card.Title>
        )}
        <Card.Text className="text-dark">{props.comment}</Card.Text>
        <div className="d-flex justify-content-end me-5">
{       isLogin &&
   
   (props.id_user !==userInfo.user.userid)
    && (      <Button
            className=" btn btn-outline-info ps-4 pe-4"
            variant="light"
            onClick={() =>
              SendComment(props.id_coment, props.name_user, props.comment)
            }
          >
            پاسخ
          </Button>)}
        </div>
      </Card.Body>
      <Card.Footer className="text-muted text-end">{props.moment}</Card.Footer>
      {props.type === "main" && (
        <Card.Footer className="text-muted bg-dark bg-opacity-10">
          <Badge count={props.numberReplay} offset={[-40, 0]} size="small">
            <button
              className=" btn btn-outline-success fs-3 fa fa-comments "
              onClick={() => setShowReplay((prev) => !prev)}
            ></button>
          </Badge>
          {showReplay &&
            Children.map(props.children, (child) => (
              <div className="Row">{child}</div>
            ))}
        </Card.Footer>
      )}
    </Card>
  );
}
