const products = [
  { id: 1, name: 'Laptop',   price: 999, stock: 10 },
  { id: 2, name: 'Mouse',    price: 29,  stock: 50 },
  { id: 3, name: 'Keyboard', price: 79,  stock: 30 },
];

class ProductService {
  static async getAll()     { return products; }
  static async getById(id)  { return products.find(p => p.id === parseInt(id)); }
}
module.exports = ProductService;
