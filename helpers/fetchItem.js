const fetchItem = async (id) => {
  try {
    if (!id) {
      throw new Error('You must provide an url');
    } else {
      const endpoint = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await endpoint.json();

      return data;
    }
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
