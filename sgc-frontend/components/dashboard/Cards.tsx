import { Box, Card, CardContent, Grid} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaymentsIcon from '@mui/icons-material/Payments';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useCombustiblesStore } from "@/store/combustibleStore";
import { useSystemOperations } from "@/store/systemStore";
import { useEffect } from "react";
import CombustibleForm from "@/components/combustible/Form";

export default function Cards() {
  const { data, getData, setSelectedData } = useCombustiblesStore();
  const { modalState, setModalState } = useSystemOperations();
  useEffect(() => {
    getData();
  }, []);
 
  return (
    <>
    <CombustibleForm/>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} key={"dg-1"}>
          <Card
            sx={{ width: 100 + "%", height: 183 }}
            className="bg-[#5F30BD] rounded-[15px] relative"
          >
            <div className="w-60 h-60 bg-[#522EA8] rounded-[50%] absolute right-[40px] top-[-130px]"></div>
            <div className="w-60 h-60 bg-[#4527A0] rounded-[50%] absolute right-[-60px] top-[-90px]"></div>
            <CardContent
              sx={{ zIndex: 100, height: "100%" }}
              className=" relative"
            >
              <div className=" mt-2 w-full flex justify-between">
                <div className=" bg-[#4527A0] p-2 rounded-md w-10">
                  <PaymentsIcon sx={{ color: "#fff" }} />
                </div>
                <button
                  className=" bg-[#673CBD] p-2 rounded-md w-10 hover:bg-[#614796]"
                  onClick={() => {
                    setModalState(!modalState);
                    setSelectedData(data?.[0]);
                  }}
                >
                  <MoreHorizIcon sx={{ color: "#fff" }} />
                </button>
              </div>
              <p className=" font-bold text-[35px] text-white mt-4">
                {"Bs " + data?.[0]?.precio}
              </p>
              <p className=" text-[#ccd1d1] font-medium">
                {data?.[0]?.nombre.toUpperCase() || "No Asignado"}
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} key={"dg-2"}>
          <Card
            sx={{ width: 100 + "%", height: 183 }}
            className="bg-[#1E88E5] rounded-[15px] relative"
          >
            <div className="w-60 h-60 bg-[#1A77D2] rounded-[50%] absolute right-[40px] top-[-130px]"></div>
            <div className="w-60 h-60 bg-[#1565C0] rounded-[50%] absolute right-[-60px] top-[-90px]"></div>
            <CardContent
              sx={{ zIndex: 100, height: "100%" }}
              className=" relative"
            >
              <div className=" mt-2 w-full flex justify-between">
                <div className=" bg-[#1565C0] p-2 rounded-md w-10">
                  <PaymentsIcon sx={{ color: "#fff" }} />
                </div>
                <button
                  className=" bg-[#2196F3] p-2 rounded-md w-10 hover:bg-[#3EA2F1]"
                  onClick={() => {
                    setModalState(!modalState);
                    setSelectedData(data?.[1]);
                  }}
                >
                  <MoreHorizIcon sx={{ color: "#fff" }} />
                </button>
              </div>
              <p className=" font-bold text-[35px] text-white mt-4">
                {"Bs " + data?.[1]?.precio}
              </p>
              <p className=" text-[#ccd1d1] font-medium">
                {data?.[1]?.nombre.toUpperCase() || "No Asignado"}
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid key={"dg-3"} spacing={2} item container xs={12} sm={12} md={4}>
          <Grid item md={12} xs={12} sm={6}>
            <Card className=" bg-[#1E88E5] rounded-[15px] relative">
              <CardContent>
                <div className="w-40 h-40 bg-[#5a9cdf9a] rounded-[50%] absolute right-[-40px] top-[-100px]"></div>
                <div className="w-40 h-40 bg-[#7cade667] rounded-[50%] absolute right-[-80px] top-[40px]"></div>
                <div className=" flex justify-start items-center translate-y-1">
                  <div className=" bg-[#1565C0] p-2 rounded-md w-10 mr-3">
                    <StorefrontIcon sx={{ color: "#ffffff" }} />
                  </div>

                  <div className=" flex flex-col">
                    <span className="font-semibold text-white">
                      Precio en Vales
                    </span>

                    <span className="text-sm text-white">Bs.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={12} xs={12} sm={6}>
            <Card className=" bg-[#FFFFFF] rounded-[15px] relative">
              <CardContent>
                <div className="w-40 h-40 bg-gradient-to-r from-orange-100 via-orange-300 to-orange-400 rounded-[50%] absolute right-[-40px] top-[-100px]"></div>
                <div className="w-40 h-40 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400   rounded-[50%] absolute right-[-80px] top-[40px]"></div>

                <div className=" flex justify-start items-center translate-y-1">
                  <div className=" bg-[#FFF8E1] p-2 rounded-md w-10 mr-3">
                    <StorefrontIcon sx={{ color: "#FFCE3D" }} />
                  </div>

                  <div className=" flex flex-col">
                    <span className="font-semibold text-black">
                      Total En Facturas
                    </span>

                    <span className="text-sm text-black">Bs.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
