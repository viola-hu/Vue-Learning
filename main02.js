// level 2
Vue.component('product', {
  // in order to receive props, components need to explicitly declare the props that it expects to receive, using the 'props' option
  // *** when declaring component props, it's recommended to specify requirements with built-in prop validation.
  props: {             // 1) add 'props' option, like 'template', 'data', 'methods', 'computed'
    whateverName: {    // 2) write the name of the prop that the component is expected to receive,
                       // 3) the object is to specify its type and other requirements of the prop.
                       // *** Prop Validation ***
                       // => Components can specify requirements for their props, such as types. If a requirement isn’t met/ validation fails, Vue will warn you in the browser’s JavaScript console. This is especially useful when developing a component that’s intended to be used by others.
      type: Boolean,
      required: true,  // required, 表示该 prop 值必须存在， specify if the prop is required or not
      default: true,   // 如果没有 value 从 parent pass down，可以在此设置一个 default value！
    },
    productDetails: {
      type: Object,
      required: true,
    }
  },
  // *** Component template must contain exactly one root element!!! - wrap a <div> most outside
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
        <div>
          <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
            Add to cart
          </button>

          <button @click="removeFromCart">
            Remove from cart
          </button>
        </div>
      </div>

      <product-tabs :reviews="reviews"></product-tabs>

      <productDetails :detailslalala=" productDetails "></productDetails>

    </div>
  `,
  // *** Transform the data object into a function that returns this data object.
  // so that it returns a brand new data object for each component, referring to different memory spaces storing the object value -> they are all separate individuals!
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
      onSale: true,
      reviews: [],
    }
  },
  methods: {
    addToCart() {
        // this.cart += 1 // as cart data is moved to parent component, it no longer works
        // instead, we need to let the parent know that the button is clicked by emitting an event!
        // *** this.$emit(' name-of-the-event ', other arguments)
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        // bubble up data of product ID as the second parameter to parent component
    },
    updateProduct(index) {
        this.selectedVariant = index
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    addReview(productReview) {
        this.reviews.push(productReview);
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

// 11, Forms: v-model, TWO-WAY data binding: template <=> data
// v-bind, ONE-WAY data binding: data => template
Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <div v-if="errors.length">
        <b> Please correct below error(s):</b>
        <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul>
      </div>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p> Question: Would you recommend this product? </p>
      <div>
        <input type="radio" id="yes" value="Yes" v-model="recommend">
        <label for="yes"> Yes </label>
        <br>

        <input type="radio" id="no" value="No" v-model="recommend">
        <label for="no"> No </label>
      </div>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>

  `,
  // *** v-model.number, '.number' is a modifier that will make sure to typecast (转型) this value as a number, instead of a string by default of any user input!
  // *** @submit.prevent, '.prevent' is an event modifier that will prevent the default behavior of browser from refreshing page when submiting a form!
  // *** for reviews, you can define some required input from users, using 'required' attribute - HTML5. If the required field is not filled in when submitted, it will show up error message automatically. 'Please fill out this field.' - this is a browser feature.
  // Alternatively, you can write your own custom form validation.
  data() {
    return {
      name: null, // 2-way bind data to inputs using v-model
      review: null,
      rating: null,
      recommend: "Yes", // set default value as 'Yes'
      errors: [],
    }
  },
  methods: {
    onSubmit() {
      this.errors = []; // reset the last round errors array if any

      if(this.name && this.review && this.rating && (this.recommend === "Yes" || this.recommend === "No")) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        }

        this.$emit('review-submitted', productReview);

        // whenever we submit this form, 尽管页面 refresh，但还会存留着上一个提交 form 的 data。
        // => after retrieving the review info from data and saving into a new variable object,
        // *** reset data (saved in memory) to null for the purpose of the next round of submit!
        // 如果不 reset，而且不 default refresh page 的话，前一个 form 的内容在 submit 后仍然留存在 form 上
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = "Yes";

      } else {

        if(!this.name)       this.errors.push("Name required.")
        if(!this.review)     this.errors.push("Review required.")
        if(!this.rating)     this.errors.push("Rating required.")
        if(this.recommend !== "Yes" && this.recommend !== "No")  this.errors.push("Answer required.")
      }
    }
  }
})

// 12, tabs
Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true,
    }
  }, // need to tell the child component "product-tabs" that it's going to receive props from parent
  template: `
    <div>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab">
        {{tab}}
      </span>

      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p
        <ul v-else>
          <li v-for="(review, index) in reviews"
              :key="index">
            <p> Rating: {{ review.rating }}, by {{ review.name }}</p>
            <p> Recommend this product? {{ review.recommend }} </p>
            <p> Review: "{{ review.review }}"</p>
          </li>
        </ul>
      </div>

      <product-review @review-submitted="addReview"></product-review>


    </div>
  `,
  // *** event handler, v-on:event = an expression directly / or a method within " "
  // e.g. @click = "selectedTab = tab", on click, assign tab's value to the data selectedTab
  // *** bind an activeTab class to the currently selectedTab span, whenever 'selectedTab === tab'
  data() {
    return {
      tabs: [ 'Reviews', 'Make a Review' ],
      selectedTab: 'Reviews', // initialize it as Reviews
    }
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
    cart: [], // in real app, we want to know exactly what's added to the cart, make it [] so we can push items into it.
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
  },
  methods: {
    updateCart(id) {
      this.cart.push(id); // push id of product into cart
    },
    removeProductFromCart(id){
      console.log('product to be removed:', id);
      console.log('this.cart before:', this.cart);

      this.cart = this.cart.filter(item => item !== id);
      console.log('this.cart after:', this.cart);
    }
  }
})

// 10, communicating events


// The HTML <b> tag is used to create a 'b' element, which represents bold text in an HTML document. The <b> tag should be used to markup text as bold without conveying any extra importance, for example in article abstracts, where the beginning of an article is set in bold text.
