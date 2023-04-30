import { v4 as uuidv4 } from "uuid";

export const Item = [
  {
    id: uuidv4(),
    icon: "fa-home",
    text: "صفحه اصلی",
    link: "",
    child: [],
  },
  {
    id: uuidv4(),
    icon: "fa-users",
    text: "کاربران",
    link: "users",
    child: [],
  },
  {
    id: uuidv4(),
    icon: "fa-book",
    text: "دوره ها",
    link: "courses",
    child: [],
  },
  {
    id: uuidv4(),
    icon: "fa-wikipedia-w",
    text: "مقاله ها",
    link: "articles",
    child: [],
  },

  {
    id: uuidv4(),
    icon: "fa-map-signs ",
    text: "منو ها",
    link: "menus",
    child: [],
  },
  {
    id: uuidv4(),
    icon: "fa-tags",
    text: "کدهای تخفیف",
    link: "discount-code",
    child: [],
  },
  {
    id: uuidv4(),
    icon: "fa-user",
    text: "حساب کاربری",
    link: "account",
    child: [],
  },

  {
    id: uuidv4(),
    icon: "fa-comments",
    text: "ارتباطات",
    link: "#",
    child: [
      { id: uuidv4(), text: "پرسش و پاسخ", link: "question" },
      { id: uuidv4(), text: "کامنت ها", link: "Comment" },
      { id: uuidv4(), text: "تیکت ها", link: "tiket" },
      { id: uuidv4(), text: "گفتگوی همکاران", link: "Chat-colleagues" },
    ],
  },
];
