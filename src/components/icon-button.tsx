import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<"button"> & {
    transparent?: boolean
};

export const IconButton = ({transparent, ...props}: Props) => {
  return (
    <button 
        className={
            `border border-white/10 rounded-md p-1.5 
            ${transparent ? '' : 'bg-white/10'}
            ${props.disabled ? 'opacity-50' : ''}
            `
        } 
        {...props}
    />
  ) 
}
