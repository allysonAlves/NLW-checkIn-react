import { ComponentProps } from "react";

type Props = ComponentProps<"table"> & {
    transparent?: boolean
};

export const Table = (props: Props) => {
  return (
    <div className="border border-white/10 rounded-lg">
        <table className="w-full" {...props}/>
    </div>
  )
}
