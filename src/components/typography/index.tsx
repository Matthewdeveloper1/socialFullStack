import React from 'react'


type Props = {
    children: string;
}

const Typography:React.FC<Props> = ({
    children 
}) => {
  return (
    <p>
      {children}
    </p>
  )
}

export default Typography
