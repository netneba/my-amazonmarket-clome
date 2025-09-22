import './App.css';
import Routing from './Routing.jsx';
import { CartProvider } from "./components/Utility/CartContext.jsx";


function App() {
  return (
    <CartProvider>
      <Routing />
    </CartProvider>
  );
}

export default App;
