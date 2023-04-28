import './Cart.css'
import { RiSecurePaymentFill } from 'react-icons/ri';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cartContext';
import { VscChromeClose } from 'react-icons/vsc';
import { ItemList } from '../ItemList/ItemList';
import { Cep } from '../Cep/Cep';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  showFireworks: () => void;
}

export const Cart = (props: CartProps) => {
  const { cartItems, getCount, getTotal } = useContext(CartContext);
  const [frete, setFrete] = useState(0);
  const count = getCount();
  const total = getTotal();

  const checkout = () => {
    if (total > 0 && frete > 0) {
      alert('Pedido enviado!')
      props.onClose();
      props.showFireworks();
    }
  }

  const handleCepChange = (valor: number) => {
    if(valor > -1) return setFrete(valor)
    setFrete(0)

  }

  return (
    <div className={`cart ${props.isOpen ? "open" : ""}`}>
      <VscChromeClose size='5rem' onClick={props.onClose}/>
      <div className='cart-left'>
        <h1>SEU CARRINHO</h1>
        {cartItems.length === 0 ? (
          <h2>Seu carrinho está vazio</h2>
        ) : (
          <h2>Você tem {count} ite{count > 1 ? 'ns' : 'm'}</h2>
        )}
        {cartItems.map((item) => (
          <ItemList key={item.id} item={item} />
        ))}
      </div>
      <div className='cart-right'>
        <h1>RESUMO</h1>
        <h2>Frete</h2>

        <Cep onCepChange={handleCepChange} onMenuOpen={props.isOpen}></Cep>

        <div className='line'>
          <span>itens ({count})</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <div className='line'>
          <span>Frete</span>
          <span>R$ {frete.toFixed(2)}</span>
        </div>

        <div id="total">
          <span className="line">
            <span>Total</span>
            <span>R$ {(total+frete).toFixed(2)}</span>
          </span>
        </div>

        <button onClick={checkout}>
          <RiSecurePaymentFill />
          <span>FECHAR PEDIDO</span>
        </button>
      </div>
    </div>
  );
};
