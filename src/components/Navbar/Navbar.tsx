import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar = (props: NavbarProps) => {
  const { getCount } = useContext(CartContext);
  const count = getCount()
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>RCTMRKT</h1>
      </div>
      <div className="navbar-cart" onClick={props.onCartClick}>
        <FaShoppingCart className="navbar-cart-icon" />
        {count > 0 && (
          <div id="count">{count}</div>
        )}
      </div>
    </nav>
  );
}