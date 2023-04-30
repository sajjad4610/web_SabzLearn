import React, { useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { v4 as uuidv4 } from "uuid";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./DataTable.css";
import Trash from "./Trash/Trash";
import EditFormUser from "../Admin/EditFormUser/EditFormUser";
import CheckedComment from "./CheckedComment/CheckedComment";
import { Avatar } from "antd";
import EditeFormMenu from "../Admin/EditeFormMenu/EditeFormMenu";
import EditeNotification from "../Notification/EditeNotification/EditeNotification";

export default function DataTable({
  columns = [],
  apiData = "",
  selectBox = [],
  refreshByTabs,
  refreshByValidform,
  refreshTrash,
  messageTrash,
  apiRemove,
  methodRemove,
  type,
  refreshTrashHandler,
  refreshForEditForm,
  refreshForEditFormHandler,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editShow, setEditShow] = useState(false);
  // const [removeShow, setRemoveShow] = useState(false);
  // const [DataTabelRow, setDataTabelRow] = useState([]);
  const [chechComment, setCheckComment] = useState("");

  const token = localStorage.getItem("user");

  useEffect(() => {
    fetch(apiData, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
      });
  }, [
    editShow,
    // removeShow,
    refreshTrash,
    apiData,
    token,
    refreshByTabs,
    refreshByValidform,
    chechComment,
    refreshForEditForm,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchHandler = (event) => {
    event.preventDefault();

    setSearchValue(event.target.value);
  };

  let finalRows = rows.filter((e) => {
    return e && selectValue && searchValue
      ? String(e[selectValue]).search(searchValue) >= 0 && e
      : e;
  });

  const editHandlerEnd = () => {
    setEditShow((prev) => !prev);
  };

  return (
    
    <div className="mb-5">
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="mb-5">
        <TableContainer sx={{ maxHeight: 500 }} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={uuidv4()}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      color: "white",
                      fontWeight: "bolder",
                      fontSize: "1.3rem",
                      backgroundColor: "rgba(163, 203, 56,1.0)",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {finalRows

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  row.updated = (
                    <div className="row justify-content-between align-items-center">
                      {type === "userFormEdite" && (
                        <div className="col">
                          <EditFormUser
                            editHandlerEnd={editHandlerEnd}
                            rows={rows}
                            api={`http://localhost:4000/v1/user/update/${row._id}`}
                            method="PUT"
                            id_EditFormUser={row._id}
                          />
                        </div>
                      )}

                      {type === "editeMenuse" && (
                        <div className="col">
                          <EditeFormMenu
                            rows={rows}
                            _id={row._id}
                            refreshForEditFormHandler={
                              refreshForEditFormHandler
                            }
                          />
                        </div>
                      )}
                      {type === "notification" && (
                        <div className="col">
                          <EditeNotification
                            rows={rows}
                            _id={row.idMessage}
                            selectUser={row.selectUser}
                            refreshForEditFormHandler={
                              refreshForEditFormHandler
                            }
                          />
                        </div>
                      )}
                      <div className="col">
                        <Trash
                          message={messageTrash}
                          apiRemove={apiRemove}
                          methodRemove={methodRemove}
                          refreshTrashHandler={refreshTrashHandler}
                          type={type}
                          id_Tarsh={
                            row._id
                              ? row._id
                              : row.idAddCourse
                              ? row.idAddCourse
                              : row.idcard
                              ? row.idcard
                              : row.idMessage
                              ? row.idMessage
                              : row.id_topic
                              ? row.id_topic
                              : row.id_Comment
                              ? row.id_Comment
                              : row.id_question
                          }
                        />
                      </div>
                    </div>
                  );
                  row.confirm = (
                    <>
                      {type === "confirmComment" && (
                        <div className="row">
                          <div className="col">
                            <CheckedComment
                              setCheckComment={setCheckComment}
                              id_Comment={row.id_Comment}
                              Stutus_comment={row.Stutus_comment}
                              apiPass={`http://localhost:4000/v1/course/passcommentcourse`}
                              apiSend="http://localhost:4000/v1/course/setcommentcourse"
                              id_course={row.id_course}
                              name_course={row.name_course}
                              name_user={row.name_user}
                              id_Orginal={row.id_CommentOrginal}
                              replay={row.replayComment}
                              comment={row.comment}
                              type_comment={row.type_comment}
                              typeData="comment"
                            />
                          </div>
                        </div>
                      )}
                      {type === "confirmQuestion" && (
                        <div className="row">
                          <div className="col">
                            <CheckedComment
                              setCheckComment={setCheckComment}
                              id_Comment={row.id_question}
                              Stutus_comment={row.Stutus_question}
                              apiPass={`http://localhost:4000/v1/course/passquestioncourse`}
                              apiSend="http://localhost:4000/v1/course/setquestioncourse"
                              id_course={row.id_course}
                              name_course={row.name_course}
                              id_question={row.id_question}
                              name_user={row.name_user}
                              id_Orginal={row.id_questionOrginal}
                              replay={row.replayquestion}
                              comment={row.question}
                              type_comment={row.type_question}
                              typeData="question"
                              avatar={row.avatar}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={uuidv4()}
                      className=""
                    >
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            key={uuidv4()}
                            align={column.align}
                            className={
                              (type === "confirmComment" ||
                                type === "confirmQuestion") &&
                              value === "تایید شده"
                                ? "bg-success bg-opacity-10 text-dark fw-bolder  "
                                : ""
                            }
                          >
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (type === "confirmComment" ||
                                type === "confirmQuestion") &&
                              typeof value === "string" &&
                              value.search("AvatarImage") !== -1 ? (
                              <Avatar src={value}></Avatar>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="row justify-content-center align-items-center">
          {useMemo(() => {
            return (
              <div className=" col  col-xxl-6 ms-3 d-none d-sm-block">
                <InputGroup>
                  <div className="input-group-text inputGroupTexDataTabet">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => setSelectValue(event.target.value)}
                    >
                      {selectBox.map((e) => (
                        <option key={uuidv4()} value={`${e.value}`}>
                          {e.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <input
                    className="form-control mb-0"
                    type="search"
                    placeholder={
                      !selectValue
                        ? "لطفا اول نوع جستجو را انتخاب کنید"
                        : selectValue === "role"
                        ? "USER یا ADMIN را جستحو کنید"
                        : selectValue === "username"
                        ? "نام کاربری را جستجو کنید"
                        : selectValue === "email"
                        ? "ایمیل مورد نظر را جستجو کنید"
                        : selectValue === "phone"
                        ? "تلفن مورد نظر را جستجو کنید"
                        : ""
                    }
                    onChange={searchHandler}
                  />
                </InputGroup>
              </div>
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])}
          <div className="col">
            <TablePagination
              className="d-flex justify-content-end align-items-baseline"
              rowsPerPageOptions={[5, 10, 15, 25, 50, 75, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
}
