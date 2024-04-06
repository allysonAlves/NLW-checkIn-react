import React, { ComponentProps } from 'react'

type Props = ComponentProps<"th"> & {};

export const TableHeader = (props: Props) => {
  return (
    <th className="py-3 px-4 text-sm font-semibold text-left" {...props}/>   
  )
}
