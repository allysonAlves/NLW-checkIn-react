import React, { ComponentProps } from 'react'

type Props = ComponentProps<"td"> & {};

export const TableCell = (props: Props) => {
  return (
    <td className="py-3 px-4 text-sm text-zinc-300" {...props}/>   
  )
}