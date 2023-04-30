export const columns = [
  // {
  //   id: "_id",
  //   label: "ID",
  //   minWidth: 70,
  //   align: "center",
  // },

  {
    id: "codeValue",
    label: "کد تخفیف",
    minWidth: 50,
    align: "center",
  },

  {
    id: "percentValue",
    label: "در صد تخفیف",
    minWidth: 50,
    align: "center",
  },
  {
    id: "fewTimesValue",
    label: "حداکثر تعداد",
    minWidth: 50,
    align: "center",
  },
  {
    id: "Coursesname",
    label: "دوره",
    minWidth: 50,
    align: "center",
  },

  {
    id: "updated",
    label: "حذف منو",
    minWidth: 100,
    align: "center",
  },
];

export let selectBoxSearch = [
  { value: "", name: "هیچکدام" },
  { value: "codeValue", name: "کد تخفیف" },
  { value: "percentValue", name: "درصد تخفیف" },
  { value: "fewTimesValue", name: "تعداد استفاده" },
  { value: "Coursesname", name: "دوره" },
];
