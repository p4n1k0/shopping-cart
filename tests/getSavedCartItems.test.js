const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Ao executar a função, o método solicitado é chamado', () => {
    expect.assertions(1);

    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Ao executar a função, o método solicitado é chamado com parâmetro requisito', () => {
    expect.assertions(1);

    getSavedCartItems();
    
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });
});
