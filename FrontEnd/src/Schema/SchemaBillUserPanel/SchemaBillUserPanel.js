export const columns = [
    {
      id: "idAddCourse",
      label: "شناسه",
      minWidth: 30,
      align: "center",
    },
  
    {
      id: "courseName",
      label: "نام دوره",
      minWidth: 50,
      align: "center",
    },
    {
      id: "courseCost",
      label: "قیمت اصلی دوره ",
      minWidth: 50,
      align: "center",
    },
    {
      id: "courseDiscount",
      label: " تخفیف دوره (%)",
      minWidth: 50,
      align: "center",
    },
    {
      id: "DiscountCodePercent",
      label: " کد تخفیف (%)",
      minWidth: 50,
      align: "center",
    },

    {
      id: "moment",
      label: "تاریخ",
      minWidth: 50,
      align: "center",
    },
  

  ];
  
  export let selectBoxSearch = [
    { value: "", name: "هیچکدام" },
    { value: "courseName", name: "نام دوره" },
    { value: "moment", name: "تاریخ" },
  ];
  