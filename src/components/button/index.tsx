import { ReactNode } from "react"
import { Link } from "react-router-dom";

type Props = {
   children: React.ReactNode;
   icon?: JSX.Element;
   className?: string;
   type?: 'button' | 'submit' | 'reset';
   fullWidth?: boolean;
   color?: string;

}

export const Button: React.FC<Props> = ({
  children,
  className,
  color,
  icon,
  type,
  fullWidth
}) => {
  return (
    <button className="flex justify-start text-xl g-5" >
      {children}
    </button>
  )
}
