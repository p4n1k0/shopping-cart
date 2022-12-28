require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Deve ser uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('Ao executar a função com parâmetro "MLB1615760527", verifica se fetch foi chamado', async () => {
    expect.assertions(1);

    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalled();
  });

  it('Ao chamar a função com parâmetro "MLB1615760527", verifica se endpoint é o esperado', async () => {
    expect.assertions(1);

    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Retorna a estrutura de dados esperada com o parâmetro "MLB1615760527"', async () => {
    expect.assertions(1);

    const response = await fetchItem('MLB1615760527');
    
    expect(response).toEqual(item)
  });

  it('Sem parâmetro, retorna erro', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
