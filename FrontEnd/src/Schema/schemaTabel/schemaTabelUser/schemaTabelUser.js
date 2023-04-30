export const columns = [
  {
    id: "_id",
    label: "ID",
    minWidth: 70,
    align: "center",
  },

  {
    id: "username",
    label: "نام",
    minWidth: 50,
    align: "center",
  },

  {
    id: "role",
    label: "نوع",
    minWidth: 50,
    align: "center",
  },
  {
    id: "email",
    label: "ایمیل",
    minWidth: 80,
    align: "center",
  },
  {
    id: "phone",
    label: "تلفن",
    minWidth: 80,
    align: "center",
  },
  // {
  //   id: "courses",
  //   label: "درس ها ",
  //   minWidth: 80,
  //   align: "center",
  // },

  // {
  //   id: "card",
  //   label: "سبد خرید",
  //   minWidth: 80,
  //   align: "center",
  // },

  {
    id: "moment",
    label: "تاریخ ثبت نام",
    minWidth: 50,
    align: "center",
  },
  {
    id: "updatedAt",
    label: "تاریخ ویرایش",
    minWidth: 50,
    align: "center",
  },


  {
    id: "updated",
    label: "ویرایش",
    minWidth: 20,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "role", name: "نوع کاربری" },
  { value: "username", name: "نام کاربری" },
  { value: "email", name: "ایمیل" },
  { value: "phone", name: "تلفن" },
];
