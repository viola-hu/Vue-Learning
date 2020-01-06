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
    brand: 'Vue Mastery',
    description: 'warm and fluffy',
    // image: './assets/socks-green.jpg',
    // *** if we want to change more than just the image based on which variant is hovered on,
    // we need to have a property, as an intermediate（中介）, to refer to the entire variant that's hovered on, so via this property we can access all the information of the variant to reference them in other parts of changes!
    selectedVariant: 0, // 0 is because we'll be setting this based on the index of variant that we hover on in the variants array.
    sockLink: 'https://www.amazon.com/slp/christmas-socks/3vaomf2m8rkr44y',
    // inStock: true,
    inventory: 100,
    showState: true,
    onSale: true,
    details: ["80% cotton", "20% polyster", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/socks-green.jpg",
        variantQuantity: 10,
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/socks-blue.jpg",
        variantQuantity: 0,
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    cart: 0,
    styleObject: {
      color: 'red',
      fontStyle: 'italic',
    },
    styleObject2: {
      background: 'yellow'
    },
    title: "Hello World!",
  },
  // 8, computed data
  // Just like data/methods property of our Vue instance, we can add an object of 'computed' properties!
  // data: original/ pure data that you get initially without calculating/computing，初始值
  // methods: 基本上用于定义 event handler callbacks
  // computed: a computed property acts like a calculator, which is fed values, then it computes with those values in order to return a new value! 多用于基于初始值计算得出的值，从而 render 在页面，而该值一般不变。若根据页面 event 而 value 发生变化，则通过 methods 来定义 event handler！

  // *** computer properties are cached!!! => the result is saved until its dependencies change.
  // e.g. cached in memory like -> productWithBrand = 'Vue Mastery Socks'
  // => 1) if any dependency is changed, the computed property will re-run the code and the new return value will be cached! => it also updates the page immediately!
  // => 2) if no dependencies change, every time the computed property is accessed, code won't re-run but only provide the cached value directly

  // Q: computed VS methods?
  // A: more efficient to use a computed property, rather than a method, for an expensive operation that you don't wanna re-run the code every time you access it.
  // while every method code will re-run every time they are triggered like event handler callbacks.
  computed: {
    productWithBrand() {
      return this.brand + ' ' + this.product;
    },
    image( ) {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity; // if 0 - false/ else - true
    },
    // onSaleNotice() {
    //   if(this.onSale) {
    //     alert(`${this.productWithBrand} is ON SALE!`)
    //   }
    // },
    printOutOnSale() {
      if(this.onSale) {
        console.log(`${this.productWithBrand} is ON SALE!`);
        return `${this.productWithBrand} is ON SALE!`;
      }
    },
  },

  // 7, Just like our instance can have a property for its data, it can also have a property for methods
  methods: {
    // addToCart: function(){
    // *** instead of anonymous function, using ES6 shorthand like below, but not all browsers may support this feature!!!
    addToCart() {
      // no need to return a value, but just action on a data property - cart
      // 'this' refers to this vue instance data - cart
      this.cart++;
    },
    // updateProduct: function(img) {
    updateProduct(index) {
      // this.image = img;
      this.selectedVariant = index; // update the selectedVariant with the index of whichever variant that is currently hovered on.
      console.log('this.selectedVariant', this.selectedVariant);
    },
    removeFromCart() {
      this.cart--;
      if(this.cart < 0) {
        this.cart = 0;
      }
    },
    sayHello() {
      this.title = 'Hello';
      return this.title;
    }
  }

  // 6, if we change Socks to Boots, expression will receive the updated value of product, and h1 will update accordingly.
  // As Vue is reactive!!! meaning: the instance's data is linked to every place that data is being referenced. => Anywhere that relies on our instance's data will update when that data changes.


  // 9, Components:
  // switch to new files - index02.html + main02.js

});
