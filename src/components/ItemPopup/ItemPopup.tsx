import './ItemPopup.css'
import { useState, FC, useContext } from "react";
import { AiFillCloseCircle, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CartContext, CartItem } from '../../contexts/cartContext';

interface ItemPopupProps {
  title: string;
  images: string[];
  description: string;
  price: number;
  onClose: () => void;
  onAddToCart?: () => void;
}

export const ItemPopup: FC<ItemPopupProps> = ({
  title,
  images,
  description,
  price,
  onClose,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
    console.log(currentImageIndex)
  };
  
  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex + images.length - 1) % images.length);
    console.log(currentImageIndex)
  };

  return (
    <div className="item-popup">
      <AiFillCloseCircle className='btn btn-close' onClick={onClose} />
      <div className='item-popup-left'>
        <div className='item-popup-image'>
          <div className='item-popup-image-container'>
            <img src={images[currentImageIndex]} alt={title} />
          </div>
        </div>
        <div className='item-popup-button'>
          {images.length > 1 && (
            <>
            <AiOutlineArrowLeft className='btn' onClick={prevImage} />
            <AiOutlineArrowRight className='btn' onClick={nextImage} />
            </>
          )}
        </div>
      </div>
      <div className='item-popup-right'>
        <h2>{title}</h2>
        <h1>R$ {price.toFixed(2)}</h1>
        <fieldset>
            <legend>DESCRIÇÃO</legend>
            <p>{description}</p>
        </fieldset>  
        <button onClick={onAddToCart}>ADICIONAR AO CARRINHO</button>
      </div>
    </div>
  );
};
