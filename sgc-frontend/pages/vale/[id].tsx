import { useRouter } from "next/router"
import ValeScene from '@/components/scenes/ValeScene'
export default function() {
    const router = useRouter()
    const talonarioId = router.query.id as string | undefined; 
    return (
    <>
    
    {talonarioId !== undefined && (
      
      <ValeScene talonarioId={talonarioId}/>
    )}
   
    </>
  )
}
