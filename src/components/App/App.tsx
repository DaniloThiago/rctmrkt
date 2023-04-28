import "./App.css";
import { Navbar } from "../Navbar/Navbar";
import { Cart } from "../Cart/Cart";
import { useContext, useState } from "react";
import { CartContext, CartItem, CartProvider } from "../../contexts/cartContext";
import { Item } from "../Item/Item";


export default () => {
  const { addItem } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  const items = [
    {
      id: 1,
      title: "Caneta Apresentador",
      description: "Laser Controle Controlador Apontador Multimídia Passador De Slides Ministrar Aulas Palestra Congresso Power Point",
      price: 59.90,
      images: [
        'https://m.media-amazon.com/images/I/51Ft4vYWuqL._AC_SX679_.jpg',
        'https://m.media-amazon.com/images/I/51DcjK2yjzL._AC_SX679_.jpg'
      ]
    },
    {
      id: 2,
      title: "Echo Dot 4ª geração",
      description: "Smart Speaker com Relógio e Alexa | Música, informação e Casa Inteligente - Cor Azul",
      price: 349.90,
      images: [
        'https://m.media-amazon.com/images/I/71Gb8-pk2VL._AC_SX679_.jpg',
        'https://m.media-amazon.com/images/I/61lGTZbOV8L._AC_SX679_.jpg'
      ]
      
    },
    {
      id: 3,
      title: "Mesa Digitalizadora XP",
      description: "PEN Artist12 2º compatível com Chromebook Mac, Windows Android Linux (Preto)",
      price: 1999.00,
      images: [
        'https://m.media-amazon.com/images/I/51SoCqQbE8L._AC_SX679_.jpg',
        'https://m.media-amazon.com/images/I/61qeKQQlfvL._AC_SX679_.jpg'
      ]
    },
    {
      id: 4,
      title: "Console Nintendo Switch Azul e Vermelho",
      description: "Nintendo Switch + Joy-Con Neon + Mario Kart 8 Deluxe + 3 Meses de Assinatura Nintendo Switch Online",
      price: 2288.00,
      images: [
        'https://m.media-amazon.com/images/I/81hxAgURvcL._AC_SX522_.jpg',
        'https://m.media-amazon.com/images/I/61kUrTHMTBL._AC_SX679_.jpg',
        'https://m.media-amazon.com/images/I/71zXnf-qRsL._AC_SX522_.jpg'
      ]
    },
    {
      id: 5,
      title: "HyperX Cloud Core",
      description: "Fone de ouvido para jogos, para PC, som surround 7.1, almofadas auriculares de espuma viscoelástica, armação de alumínio durável, microfone removível com cancelamento de ruído",
      price: 457.05,
      images: [
        'https://m.media-amazon.com/images/I/712CzUClvjL._AC_SX522_.jpg',
        'https://m.media-amazon.com/images/I/71ne1LEMNuL._AC_SX522_.jpg',
        'https://m.media-amazon.com/images/I/71mNwDOrT5L._AC_SX522_.jpg'
      ]
    },
    {
      id: 6,
      title: "GeForce RTX™ 4080 16GB",
      description: "PNY Placa gráfica GeForce RTX™ 4080 16GB XLR8 Gaming VERTO EPIC-X RGB™ Overclocked Triple Fan DLSS 3",
      price: 9854.50,
      images: [
        'https://m.media-amazon.com/images/I/61i87RI6pVL._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/51196h7DhzL._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/51i9wg9ELyL._AC_SL1000_.jpg'
      ]
    },
    {
      id: 7,
      title: "Monitor Gamer Curvo Samsung Odyssey 34'",
      description: "Monitor Gamer Curvo Samsung Odyssey 34', WQHD, 165Hz, 1ms, tela ultrawide, HDMI, Display Port, Freesync Premium, preto, série G5",
      price: 3399.90,
      images: [
        'https://m.media-amazon.com/images/I/81wfdDTIjHS._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81ctQA+tkES._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81KUCZPSXHS._AC_SL1500_.jpg'
      ]
    },
  ];

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleFireworks = () => {
    setFireworks(true);
    setTimeout(() => {
      setFireworks(false);
    },5000);
  }

  return (
    
    <div className="App">
      <Navbar onCartClick={handleCartClick} />
      <section id="items">
        {items.map((item) => (
          <Item key={item.id} item={item} onAddToCart={() => addItem(item)} />
        ))}
      </section>
      <Cart isOpen={isCartOpen} onClose={handleCartClick} showFireworks={handleFireworks} />
      {fireworks && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
    </div>

  );
}