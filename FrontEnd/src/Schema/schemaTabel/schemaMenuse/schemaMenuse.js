export const columns = [
  // {
  //   id: "_id",
  //   label: "ID",
  //   minWidth: 70,
  //   align: "center",
  // },

  {
    id: "namefather",
    label: "اسم لینک پدر",
    minWidth: 50,
    align: "center",
  },

  {
    id: "linkfather",
    label: "لینک منوی پدر",
    minWidth: 50,
    align: "center",
  },
  {
    id: "namechild",
    label: "اسم منو فرزند",
    minWidth: 50,
    align: "center",
  },
  {
    id: "linkchild",
    label: "لینک فرزند",
    minWidth: 50,
    align: "center",
  },
  {
    id: "parent",
    label: "منو پدر",
    minWidth: 50,
    align: "center",
  },

  {
    id: "updated",
    label: "ویرایش منو",
    minWidth: 100,
    align: "center",
  },

];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "namefather", name: "منوی پدر" },
  { value: "linkfather", name: "لینک پدر" },
  { value: "namechild", name: "منوی فرزند" },
  { value: "linkchild", name: "لینک فرزند" },
];
