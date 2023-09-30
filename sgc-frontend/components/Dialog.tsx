import { useSystemOperations } from "@/store/systemStore"
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props{
    title:string,
    children: React.ReactNode,
    actions:boolean,
}
export default function Form({title,children,actions,}:Props) {
  const {
    modalState,
  } = useSystemOperations();

  return (
    <Dialog open={modalState} fullWidth={true} maxWidth={"sm"}>
      {actions && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
