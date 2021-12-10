import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

interface MenuItem {
  title: string;
  Icon:
    | typeof HomeIcon
    | typeof SearchIcon
    | typeof EmailOutlinedIcon
    | typeof PersonOutlineOutlinedIcon;
}

export const menuConfig: MenuItem[] = [
  { title: "Главная", Icon: HomeIcon },
  { title: "Поиск", Icon: SearchIcon },
  { title: "Сообщения", Icon: EmailOutlinedIcon },
  { title: "Профиль", Icon: PersonOutlineOutlinedIcon },
];
