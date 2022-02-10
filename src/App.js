import './App.css';
import { useEffect, useState } from 'react';
import ProductList from './components/ProductsList'
import Cart from './components/Cart';
import Header from './components/Header';
import {GlobalStyle} from './globalStyles'

function App() {
  const [products, setProducts] = useState([])
  const [currentSale, setCurrentSale] = useState([])


  useEffect(() => {
    fetch('https://hamburgueria-kenzie-json-serve.herokuapp.com/products')
    .then(response => response.json())
    .then(response => setProducts(response))
    .catch(err => console.log(err))
  }, [])

  function showProducts(inputValue){
    const newProducts = products.filter(productFiltered => {
      return productFiltered.category === inputValue
    })
    setProducts(newProducts)
  }

  function handleClick(productId){
    if(!currentSale.includes(productId)){
      setCurrentSale([...currentSale, productId])
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <GlobalStyle />
        <Header showProducts={showProducts}/>
        <main className='mainContainer'>
          <ProductList products={products} handleClick={handleClick}/>
          <Cart currentSale={currentSale} setCurrentSale={setCurrentSale}/>
        </main>
      </header>
    </div>
  );
}

export default App;
