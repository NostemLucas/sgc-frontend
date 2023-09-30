import TalonarioForm from './TalonarioForm';
import DataGrid from './DataGridTalonario';
export default function TalonarioPanel() {
  return (
    <>
    <TalonarioForm/>
    <p className='mt-2 mb-2 font-medium'>Lista de Talonarios</p>
    <DataGrid/>
    
    </>
  )
}
