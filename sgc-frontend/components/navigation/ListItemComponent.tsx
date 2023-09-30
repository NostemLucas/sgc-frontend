import { ListItem } from "@mui/material";
import Link from "next/link";
import { useSystemOperations } from "@/store/systemStore";
import { useState } from "react";

interface Props{
    text:string,
    route:string,
    icon: any,
}
export default function ListItemComponent({ text, route, icon }: Props) {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const { open, setStateSideBar } = useSystemOperations();
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <div
        className={`"w-full p-2 flex justify-center items-center hover:bg-blue-400  text-white ${
          selectedLink === route ? "bg-blue-500 text-white" : ""
        }`}
      >
        <Link href={route}>
          <a
            className={`w-[80%] rounded-[15px] p-2 flex justify-start items-center`}
            onClick={() => setSelectedLink(route)}
          >
            {icon}
            {open && <p className=" font-normal">{text}</p>}
          </a>
        </Link>
      </div>
    </ListItem>
  );
}

