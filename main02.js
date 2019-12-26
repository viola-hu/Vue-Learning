// level 2
Vue.component('product', {
  props: {             // 1) add 'props' option, like 'template', 'data', 'methods', 'computed'
    whateverName: {    // 2) write the name of the prop that the component is expected to receive,
                       // 3) the object is to specify its type and other requirements of the prop.
                       // *** Prop Validation ***
                       // => Components can specify requirements for their props, such as types. If a requirement isn’t met/ validation fails, Vue will warn you in the browser’s JavaScript console. This is especially useful when developing a component that’s intended to be used by others.
      type: Boolean,
      required: true,  // ??? Q1: required, what will happen if the actual passed down value is false?
    },
    productDetails: {
      type: Object,
      required: true,
    }
  },
  template: `
    <div class="product">

      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>{{ sale }}</p>

        <p>User is premium: {{ whateverName }}</p>

        <p>Shipping: {{ shipping }}</p>



        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>


        <div class="color-box"
             v-for="(variant, index) in variants"
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)"
             >
        </div>

        <button v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>

        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>

        <productDetails :detailslalala=" productDetails "></productDetails>

      </div>

    </div>
  `,
  // !!! Transform the data object into a function that returns this data object.
  data () {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0
        }
      ],
      cart: 0,
      onSale: true
    }
  },
  methods: {
      addToCart: function() {
          this.cart += 1
      },
      updateProduct: function(index) {
          this.selectedVariant = index
      }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image(){
          return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
          return this.variants[this.selectedVariant].variantQuantity
      },
      sale() {
        if (this.onSale) {
          return this.brand + ' ' + this.product + ' are on sale!'
        }
          return  this.brand + ' ' + this.product + ' are not on sale'
      },
      shipping() {
        if(this.whateverName){
          return 'Free';
        }
        return 2.99;
      },
  }
})


// Challenge:
// level 3
Vue.component('productDetails', {
  props: {
    detailslalala: {
      type: Object,
      require: true,
    }
  },
  template:
  `
    <div>
      <h1> Product details: </h1>
      <div v-for="product in detailslalala">
        <h3> {{product.productName}} </h3>
        <p> Size: <span v-for="size in product.sizes"> {{size}} </span> </p>
        <p> Inventory: {{product.inventory}} </p>
      </div>
    </div>
  `
})


// ROOT level : level 1
var app = new Vue({
  el: '#app',
  data: {
    premium: true,  // pass this data into <product> component as a prop, from parent to child element
                    // *** if premium: 'hi', we received a warning in console as below
                    // [Vue warn]: Invalid prop: type check failed for prop "whateverName". Expected Boolean, got String.
    productDetails: {
      greenSocks: {
        productName: "Green socks",
        sizes: ['S', 'M', 'L'],
        inventory: 600,
      },
      blueSocks: {
        productName: "Blue socks",
        sizes: ['S', 'XL'],
        inventory: 800,
      }
    }
  }
})
