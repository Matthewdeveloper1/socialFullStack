import { Link } from "react-router-dom";
import { Button } from "../button";


type Props ={
  children: React.ReactNode;
  className?: string;
  icon?: JSX.Element;
  href: string;
}
export const NavButton: React.FC<Props> = ({
  children,
  icon,
  href
}) => {
  return (
    <div>
      <Button className="flex justify-start text-xl">
        <Link className ="flex items-center gap-5" to={href}>
          {children}
        </Link>
      </Button>

    </div>
  )
}

