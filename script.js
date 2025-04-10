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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const click = event.target;
  cartItems.removeChild(click);
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
    saveCartItems(cartItems.innerHTML);
  });
}

const searchProducts = async () => {
  const data = await fetchProducts('computador');
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
  removeLoading();
  return productItem;
}


window.onload = async () => {
  cartItems.innerHTML = getSavedCartItems();
  searchProducts();
  removeItems();
};
