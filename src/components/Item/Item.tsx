import './Item.css'
import { useState, FC } from "react";
import { ItemPopup } from "../ItemPopup/ItemPopup";
import { MdAddShoppingCart } from 'react-icons/md';

export interface ItemProps {
  key: number;
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    quantity?: number;
  };
  onAddToCart?: () => void;
}

export const Item: FC<ItemProps> = ({ item, onAddToCart}) => {
  const { title, images, description, price } = item
  const [popupVisible, setPopupVisible] = useState(false);

  const handleItemClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className="item-card">
        <h2>{title}</h2>
        <img className='item-card-image' src={images[0]} alt={title} onClick={handleItemClick} />
        <div className='item-card-footer'>
          <p>Preço: <b>R$ {formatarValor(price)}</b></p>
          <button onClick={onAddToCart}>
            <MdAddShoppingCart /> Adicionar
          </button>
        </div>
      </div>
      {popupVisible && (
        <div className="item-popup-open">
          <ItemPopup
            title={title}
            images={images}
            description={description}
            price={price}
            onClose={handlePopupClose}
            onAddToCart={onAddToCart}
          />
        </div>
      )}
    </>
  );
};

const formatarValor = (valor: number) => {
  // Remover caracteres não numéricos (exceto ponto e vírgula)
  const numericValue = valor.toFixed(2).toString().replace(/[^0-9.,]/g, '');
  // Dividir o valor em parte inteira e parte decimal
  const partes = numericValue.split('.');
  const parteInteira = partes[0];
  const parteDecimal = partes.length > 1 ? ',' + partes[1] : '';
  // Adicionar pontos para separar milhares
  const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // Concatenar parte inteira e parte decimal com vírgula
  const valorFormatado = parteInteiraFormatada + parteDecimal;
  return valorFormatado;
};
