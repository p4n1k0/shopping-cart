const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;

  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section'); 

  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const click = event.target;
  cartItems.removeChild(click);
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {  
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}

async function removeLoading() {
  document.querySelector('.loading').remove();
}

async function searchProducts(products) {
  const data = await fetchProducts(products);
  removeLoading();
  const dataPath = await data.results;
   const productItem = dataPath.map((item) => {
     const objItem = {
       sku: item.id,
       name: item.title,
       image: item.thumbnail,
     };
     return items.appendChild(createProductItemElement(objItem));
    });
return productItem;
}

async function elements(id) {
  const data = await fetchItem(id);
  const objItem = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };  
  cartItems.appendChild(createCartItemElement(objItem));   
  saveCartItems(cartItems.innerHTML);
}

function addToCart() {
  items.addEventListener('click', (event) => { 
    if (event.target.className === 'item__add') {
      const click = event.target;
      const ids = click.parentNode;
      const $ItemID = ids.firstChild.innerText;

      return elements($ItemID);
    }
  });  
} 

function removeItems() {
  emptyCart.addEventListener('click', () => {
    cartItems.innerHTML = '';
  });  
}
 
window.onload = async () => {
   await searchProducts('computador');
   addToCart();
   removeItems();
};
