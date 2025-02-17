import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import  { ReactNode } from 'react'
import {IconType} from 'react-icons'

type Props ={
    count: number
}

const MetaInfo:React.FC<Props> = ({
    count
}) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer'>
      {
        count > 0 && (
            <p className="font-semibold text-default-400 text-l">
                {count}
            </p>
        )
      }
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
      </p>
    </div>
  )
}

export default MetaInfo
