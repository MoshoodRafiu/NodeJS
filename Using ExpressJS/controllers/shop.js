const Product = require('../models/product');
// const Cart = require('../models/cart');
const e = require('express');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products'
    });
  })
  .catch(err => console.log(err));
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then((product) => {
        res.render('shop/product-detail', {
          pageTitle: product.title,
          path: '/products',
          product
        });
      })
      .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

// exports.getCart = (req, res, next) => {
//   req.user.getCart()
//     .then(cart => {
//       return cart.getProducts()
//     })
//     .then(products => {
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  Product.findById(prodId)
    .then(product => {
      console.log(product._id);
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log('Added to cart');
    })
  // req.user.getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({where: {id: prodId}})
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0){
  //       product = products[0];
  //     }
  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(prodId)
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity }
  //     });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
}

// exports.postCartDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   req.user.getCart()
//     .then(cart => {
//       return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
      });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
      .then(order => {
        return order.addProducts(products.map(product => {
          product.orderItem = {
            quantity: product.cartItem.quantity
          };
          return product;
        }));
      })
      .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err));
}