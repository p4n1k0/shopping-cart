const fetchProducts = async (product) => {
  try {
    if (!product) {
      throw new Error('You must provide an url');
    } else {
      const endpoint = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
      const data = await endpoint.json();

      return data;
    }
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
