import React, { ComponentProps } from 'react'

type Props = ComponentProps<"tr"> & {
    hover?: boolean
};

export const TableRow = ({hover, ...props}: Props) => {
  return (
    <tr className={`border-b border-white/10 ${hover ? 'hover:bg-white/5': ''}`} {...props}/>   
  )
}