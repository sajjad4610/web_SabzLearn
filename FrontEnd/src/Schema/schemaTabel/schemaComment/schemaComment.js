
export const columns = [
  {
    id: "avatar",
    label: "تصویر",
    minWidth: 70,
    align: "center",
  },

  {
    id: "name_user",
    label: "فرستنده پیغام",
    minWidth: 50,
    align: "center",
  },

  {
    id: "name_course",
    label: "اسم دوره",
    minWidth: 50,
    align: "center",
  },

  {
    id: "comment",
    label: "متن پیغام",
    minWidth: 100,
    align: "center",
  },

  {
    id: "Stutus_comment",
    label: "وضعیت پیغام",
    minWidth: 50,
    align: "center",
  },
  {
    id: "type_comment",
    label: "نوع پیغام",
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
    id: "confirm",
    label: "تایید کامنت",
    minWidth: 100,
    align: "center",
  },
  {
    id: "updated",
    label: "حذف کامنت",
    minWidth: 100,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "Stutus_comment", name: "وضعیت پیغام" },
  { value: "type_comment", name: "نوع پیغام" },
  { value: "comment", name: "متن بیغام" },
  { value: "name_course", name: "دوره" },
  { value: "name_user", name: "نام فرستنده" },
  { value: "moment", name: "تاریخ" },
];
