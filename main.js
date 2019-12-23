// 1, new Vue({ OPTIONS }) creates a new vue instance, which is the root of a Vue application / heart of the application!
// 2, it's created by passing an 'options object' - {options} into it, which has a variety of optional properties which are used to store data and perform actions.
// 3, In order to form a relationship between the Vue instance and part of the DOM, we use the property 'el'. e.g. here we specify to plug the instance into <div id="app">
// => now this div and its CONTENTS within it is hooked up to our instance.
const app = new Vue({
  el: '#app',

  // 4, the instance can also have a property for data
  data: {
    // 5, in order to display this property 'product', use {{}} in HTML to hold 'Expression' which is used to produce or evaluate a value
    // e.g.
    // {{ firstName + ' ' + lastName }}
    // {{ clicked ? true : false }}
    product: 'Socks',
    description: 'warm and fluffy',
    image: './assets/socks-green.jpg',
    sockLink: 'https://www.amazon.com/slp/christmas-socks/3vaomf2m8rkr44y',
    inStock: true,
    inventory: 100,
    showState: true,
    onSale: true,
    details: ["80% cotton", "20% polyster", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/socks-green.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/socks-blue.jpg"
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    cart: 0,
  },
  // Just like our instance can have a property for its data, it can also have a property for methods
  methods: {
    addToCart: function(){
      // no need to return a value, but just action on a data property - cart
      // 'this' refers to this vue instance data - cart
      this.cart++;
    },
    changeImage: function(img) {
      this.image = img;
    }
  }

  // 6, if we change Socks to Boots, expression will receive the updated value of product, and h1 will update accordingly.
  // As Vue is reactive!!! meaning: the instance's data is linked to every place that data is being referenced. => Anywhere that relies on our instance's data will update when that data changes.

});
