import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/material';

interface Props{
    text: string;
}

export default function IconBreadcrumbs({text}:Props) {
  return (
    <Box className=" flex flex-row justify-start items-center">
      <Link href="/">
        <a>
        <Box className=" flex flex-row justify-start items-center">
   
          <HomeIcon sx={{ mr: 0.5, mb: 0.9,color:'#5e6b73'}}  fontSize="medium" />
          <Typography  sx={{ color:'#5e6b73'}} className=" text-lg">Home</Typography>
        </Box>
        </a>
        
      </Link>
      <p className=" text-lg font-black ml-2 mr-2">/</p>
      <Typography className=" text-lg" color="#1976D2">
        {text}
      </Typography>
    </Box>
  );
}


