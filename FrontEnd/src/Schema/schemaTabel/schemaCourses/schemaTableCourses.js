export const columns = [
  // {
  //   id: "_id",
  //   label: "ID",
  //   minWidth: 70,
  //   align: "center",
  // },

  {
    id: "name",
    label: "نام دوره",
    minWidth: 50,
    align: "center",
  },

  {
    id: "status",
    label: "وضعیت دوره",
    minWidth: 50,
    align: "center",
  },
  {
    id: "cost",
    label: "قیمت دوره",
    minWidth: 80,
    align: "center",
  },
  {
    id: "teacher",
    label: "مدرس دوره",
    minWidth: 80,
    align: "center",
  },
  {
    id: "section",
    label: "بخش دوره ",
    minWidth: 80,
    align: "center",
  },
  {
    id: "link",
    label: "لینک دوره ",
    minWidth: 80,
    align: "center",
  },

  {
    id: "typecost",
    label: "شرایط دوره",
    minWidth: 80,
    align: "center",
  },

  {
    id: "updated",
    label: "حذف دوره",
    minWidth: 100,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "name", name: "نام دوره" },
  { value: "status", name: "وضعیت دوره" },
  { value: "cost", name: "قیمت دوره" },
  { value: "teacher", name: "مدرس دوره" },
  { value: "section", name: "بخش دوره" },
  { value: "typecost", name: "شرایط دوره" },
  { value: "link", name: "لینک دوره" },
];
