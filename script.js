const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');

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


const productsPrice = async () => {
  const cartList = document.querySelectorAll('.cart__item');
  let totalPriceCart = 0;
  cartList.forEach((item) => {
    const price = parseFloat(item.innerText.substring(item.innerText.indexOf('$') + 1));
    totalPriceCart += price;
  });
  totalPrice.innerText = totalPriceCart;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const click = event.target;
  cartItems.removeChild(click);
  productsPrice();
  saveCartItems(cartItems.innerHTML);
}

const nativeItems = () => {
  cartItems.addEventListener('click', cartItemClickListener);
};
nativeItems();

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  return li;
}

async function removeLoading() {
  document.querySelector('.loading').remove();
}

const elements = async (ItemID) => {
  const data = await fetchItem(ItemID);
  const obj = {
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  };
  const list = createCartItemElement(obj);
  cartItems.appendChild(list);
  productsPrice();
  saveCartItems(cartItems.innerHTML);
};

const addToCart = () => {
  items.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') {
      const click = event.target;
      const ids = click.parentNode;
      const $ItemID = ids.firstChild.innerText;

      return elements($ItemID);
    }
  });
}

const removeItems = () => {
  emptyCart.addEventListener(('click'), () => {
    cartItems.innerHTML = '';
    productsPrice();
    saveCartItems(cartItems.innerHTML);
  });
}

const searchProducts = async () => {
  const data = await fetchProducts('computador');
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
  addToCart();
  return productItem;
}


window.onload = async () => {
  cartItems.innerHTML = getSavedCartItems();
  searchProducts();
  removeItems();
  productsPrice();
};
