import { Card, CardContent, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useTalonarioStore } from "@/store/talonarioStore";
import Link from "next/link";
import { Talonario } from "@/models/talonario";

interface Props {
talonario: Talonario
}

export default function CardVale({talonario}:Props) {

  return (
    <Link
      href={"/vale/" + talonario.id}
    >
      <a>
        <Card
          className=" bg-[#FFFFFF] rounded-[15px] relative hover:bg-blue-200 mt-2"
          elevation={0}
        >
          <CardContent>
            <div className="w-40 h-40 bg-gradient-to-r from-violet-100 via-violet-400 to-violet-500 rounded-[50%] absolute right-[-40px] top-[-100px]"></div>
            <div className="w-40 h-40 bg-gradient-to-r   from-violet-300 via-violet-600 to-violet-700  rounded-[50%] absolute right-[-80px] top-[40px]"></div>

            <div className=" flex justify-start items-center translate-y-1">
              <div className=" bg-[#FFF8E1] p-2 rounded-md w-10 mr-3">
                <StorefrontIcon sx={{ color: "#FFCE3D" }} />
              </div>

              <div className=" flex flex-col">
                <span className="font-semibold text-black">
                  {talonario?.gasolinera?.nombre
                    ? talonario?.gasolinera.nombre
                    : ""}
                </span>
                <span className="text-sm text-black">{talonario.inicio}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
