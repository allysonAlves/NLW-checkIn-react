import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<"a"> & {
  children: string; 
};

export const NavLink = ({ children, ...rest }: Props) => {
  return (
    <a className="font-medium text-sm text-zinc-300" {...rest}>
      {children}
    </a>
  );
};
