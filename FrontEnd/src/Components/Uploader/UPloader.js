import React from "react";
import Swal from "sweetalert2";
export default function UPloader({
  appendName,
  VlueUPloader,
  setVlueUPloader,
  setDataUPloader,
  type = "image",
  size = "normal",
}) {
  const UploadImageHandler = async () => {
    const { value: file } = await Swal.fire({
      title:
        type === "image" 
          ? "عکس مورد نظر انتخاب کنید"
          : "ویدیو مورد نظر انتخاب کنید",
      input: "file",
      inputAttributes: {
        accept: type === "image"  ? "image/*" : "video/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const data = new FormData();
      data.append(appendName, file);

    

      setDataUPloader(data);

      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          imageUrl: e.target.result,
          title:
            type === "image" 
              ? "عکس مورد نظر انتخاب شد"
              : "ویدیو مورد نظر انتخاب شد",
          imageAlt:
            type === "image" 
              ? "عکس مورد نظر انتخاب شد"
              : "ویدیو مورد نظر انتخاب شد",
        });
        setVlueUPloader(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="row flex-column justify-content-center align-items-center mt-2 mb-5 w-100 ">
        <div
          className={`${
            size === "normal"
              ? "col-4"
              : size === "small"
              ? "col-3"
              : size === "madium"
              ? " col-8"
              : "col"
          }  d-flex justify-content-center align-items-center`}
        >
          {type === "image" ? (
            <img
              className="  img-thumbnail w-100 "
              src={
                VlueUPloader
                  ? VlueUPloader
                  : "../images/defualtImage/camera.jpg"
              }
              alt="imge"
            />
          ) :  (
            <video
              className="img-thumbnail w-100 "
              src={
                VlueUPloader ? VlueUPloader : "../images/defualtImage/Video.jpg"
              }
              alt="video"
              controls
              poster="../images/defualtImage/Video.jpg"
              // preload="none"
            />
          )}
        </div>
        <div className="col-12 d-flex justify-content-center   mt-4 w-100">
          <button
            onClick={UploadImageHandler}
            className={`btn  fa  fs-4 p-3 ${
              type === "image"
                ? "w-50 btn-outline-info fa-camera"
                : "w-50 btn-outline-info fa-video"
            } `}
          >
            {" "}
            <span className="ms-3">انتخاب</span>
          </button>
        </div>
      </div>
    </div>
  );
}
