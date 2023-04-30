export const columns = [
  // {
  //   id: "idAddCourse",
  //   label: "ID",
  //   minWidth: 70,
  //   align: "center",
  // },

  {
    id: "selectUserEmail",
    label: "ایمیل کاربر",
    minWidth: 50,
    align: "center",
  },
  {
    id: "userName",
    label: "نام کاربر",
    minWidth: 50,
    align: "center",
  },

  {
    id: "courseName",
    label: "نام دوره",
    minWidth: 50,
    align: "center",
  },

  {
    id: "moment",
    label: "تاریخ",
    minWidth: 50,
    align: "center",
  },

  {
    id: "updated",
    label: "ویرایش دوره کاربر",
    minWidth: 5,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "selectUserEmail", name: "ایمیل کاربر" },
  { value: "userName", name: "نام کاربر" },
  { value: "courseName", name: "نام دوره" },
  { value: "moment", name: "تاریخ" },
];
