export const columns = [
  {
    id: "idMessage",
    label: "IDMessage",
    minWidth: 70,
    align: "center",
  },

  {
    id: "sender",
    label: "فرستنده",
    minWidth: 50,
    align: "center",
  },

  {
    id: "selectUser",
    label: "گیرنده",
    minWidth: 80,
    align: "center",
  },
  {
    id: "message",
    label: "پیفام",
    minWidth: 200,
    align: "center",
  },
  {
    id: "dataTime",
    label: "تاریخ",
    minWidth: 50,
    align: "center",
  },

  {
    id: "updated",
    label: "ویرایش",
    minWidth: 100,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "sender", name: "فرستنده" },
  { value: "selectUser", name: "گیرنده" },
  { value: "dataTime", name: "تاریخ" },
  { value: "message", name: "پیغام" },
];
