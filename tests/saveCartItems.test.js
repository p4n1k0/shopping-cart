const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Ao executar a função com um parâmetro definido, o método previsto é chamado com dois parâmentros, sendo eles o cartItems e o valor passado como parâmentro da funçao saveCartItems', () => {
    expect.assertions(1);

    saveCartItems('<ol><li>Item</li></ol>');

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
