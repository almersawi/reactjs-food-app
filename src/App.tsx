import Header from './components/Layout/header/Header';
import Meals from './components/Meals/meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandeler = () => {
    setShowCart(true);
  }

  const hideCartHandeler = () => {
    setShowCart(false);
  }

  return (
    <CartProvider>
      { showCart && <Cart onClose={hideCartHandeler}/> }
      <Header onShowCartChange={showCartHandeler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
