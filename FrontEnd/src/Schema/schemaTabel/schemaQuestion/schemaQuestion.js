export const columns = [
  {
    id: "avatar",
    label: "تصویر",
    minWidth: 70,
    align: "center",
  },
    {
      id: "name_user",
      label: "فرستنده سوال",
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
      id: "question",
      label: "متن ",
      minWidth: 100,
      align: "center",
    },
  
    {
      id: "Stutus_question",
      label: "وضعیت ",
      minWidth: 50,
      align: "center",
    },
    {
      id: "type_question",
      label: "نوع ",
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
      label: "تایید ",
      minWidth: 100,
      align: "center",
    },
    {
      id: "updated",
      label: "حذف ",
      minWidth: 100,
      align: "center",
    },
  ];
  
  export let selectBoxSearch = [
    { value: "", name: "هیچکدام" },
    { value: "Stutus_question", name: "وضعیت سوال " },
    { value: "type_question", name: "نوع سوال" },
    { value: "question", name: "متن بیغام" },
    { value: "name_course", name: "دوره" },
    { value: "name_user", name: "نام فرستنده" },
    { value: "moment", name: "تاریخ" },
  ];
  