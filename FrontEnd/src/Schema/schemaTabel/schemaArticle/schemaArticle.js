export const columns = [
  // {
  //   id: "_id",
  //   label: "ID",
  //   minWidth: 70,
  //   align: "center",
  // },

  {
    id: "name",
    label: "نام مقاله",
    minWidth: 50,
    align: "center",
  },

  {
    id: "link",
    label: "لینک مقاله",
    minWidth: 50,
    align: "center",
  },

  {
    id: "writer",
    label: "نویسنده",
    minWidth: 50,
    align: "center",
  },

  {
    id: "updated",
    label: "حذف مقاله",
    minWidth: 100,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "name", name: "نام مقاله" },
  { value: "writer", name: "نویسنده" },
  { value: "link", name: "لینک مقاله" },
];
