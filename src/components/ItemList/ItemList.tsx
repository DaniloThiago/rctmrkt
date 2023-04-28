import './ItemList.css'
import { useContext, FC } from 'react';
import { CartContext, CartItem } from '../../contexts/cartContext';
import { FaMinusSquare, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';

interface ItemListProps {
  item: CartItem;
}

export const ItemList: FC<ItemListProps> = ({ item }) => {
  const { title, images, quantity, price } = item;
  const { addItem, removeItem, deleteItem } = useContext(CartContext);

  return (
      <article className='item-list'>
        <div className='item-list-image'>
          <img src={images[0]} alt={title} />
        </div>
        <div className='item-list-info'>
          <h3>
            {title}
          </h3>
          <h4>
            R$ {price.toFixed(2)}
          </h4>
        </div>
        <div className='item-list-icons'>
          <FaMinusSquare onClick={() => removeItem(item)}/>
          {quantity}
          <FaPlusSquare onClick={() => addItem(item)}/>
          <div className='item-list-price'>R$ {((quantity || 0) * price).toFixed(2)}</div>
          <FaTrashAlt onClick={() => deleteItem(item)}/>
        </div>
      </article>
  );
};
