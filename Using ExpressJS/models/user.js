const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
                quantity: {type: Number, required: true}
            }
        ]
    }
});

userSchema.methods.addToCart = function(product){
    const cartProductIndex = this.cart.items.findIndex(
        p => p.productId.toString() === product._id.toString()
    );
    let newQunatity = 1;
    const updatedCartItems = [ ...this.cart.items ];
    if(cartProductIndex >= 0) {
        newQunatity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQunatity;
    }else{
        updatedCartItems.push({
            productId: product._id,
            quantity: newQunatity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteCartItem = function(prodId){
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== prodId.toString());
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart.items = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb')
// const getDb = require('../util/database').getDb;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db
//           .collection('users')
//           .insertOne(this)
//           .then(result => {
//               console.log(result);
//           })
//           .catch(err => console.log(err));
//     }

//     addToCart(product) {
//         const cartProductIndex = this.cart.items.findIndex(
//             p => p.productId.toString() === product._id.toString()
//         );
//         let newQunatity = 1;
//         const updatedCartItems = [ ...this.cart.items ];
//         if(cartProductIndex >= 0) {
//             newQunatity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQunatity;
//         }else{
//             updatedCartItems.push({
//                 productId: new mongodb.ObjectId(product._id),
//                 quantity: newQunatity
//             });
//         }
//         const updatedCart = {
//             items: updatedCartItems
//         };
//         const db = getDb();
//         return db
//           .collection('users')
//           .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});

//     }

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })
//         console.log(productIds);
//         return db
//             .collection('products')
//             .find({_id: {$in: productIds}})
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {...p, quantity: this.cart.items.find(i => {
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity};
//                 })
//             })
//     }

//     deleteCartItem(prodId) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== prodId.toString());
//         return db
//           .collection('users')
//           .updateOne({
//               _id: new mongodb.ObjectId(this._id)
//             }, {
//               $set: {cart: {items: updatedCartItems}}
//             });
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     item: products,
//                     user: {
//                         _id: new mongodb.ObjectId(this._id),
//                         name: this.name
//                     }
//                 }
//                 return db
//                     .collection('orders')
//                     .insertOne(order)
//                     .then(() => {
//                         this.cart = {items: []};
//                         return db
//                             .collection('users')
//                             .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: {items: []}}});
//                     });
//             })
//     }

//     getOrders() {
//         const db = getDb();
//         return db.
//             collection('orders').find({'user._id': new mongodb.ObjectId(this._id)})
//             .toArray();
//     }

//     static findById(id) {
//         const db = getDb();
//         return db
//           .collection('users')
//           .findOne({_id: new mongodb.ObjectId(id)})
//           .then(user => {
//             console.log(user);
//             return user;
//         })
//         .catch(err => console.log(err));
//     }
// }

// module.exports = User;