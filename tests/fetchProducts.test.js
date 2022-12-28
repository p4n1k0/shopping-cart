require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

// ref: https://github.com/tryber/sd-020-a-live-lectures/blob/lecture/9.3/githubSimulated.test.js
describe('1 - Teste a função fetchProducts', () => {
  it('Deve ser uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Ao chamar a função com o parâmetro "computador", testa se fetch foi chamada', async () => {
    expect.assertions(1);

    await fetchProducts('computador');
    
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao chamar a função fetchProducts, verifica se a função fetch utiliza endpoint correto', async () => {
    expect.assertions(1);

    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Se o retorno da funçao é um objeto igual a computadorSearch', async () => {
    expect.assertions(1)

    const fetchProduct = await fetchProducts('computador');

    expect(fetchProduct).toEqual(computadorSearch);
  });
});
