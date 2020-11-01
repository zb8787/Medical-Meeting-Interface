// Object property short hand 

const name = 'Andrew'
const userAge = 27

// since the variable name matched with name property, we can delete the name 
const user = {
    name,
    age: userAge,
    location: 'New York'
}

console.log(user)

// object destructuring 
// access objects and their values into into individual variables 
const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// // need mulitiple lines 
// const label = product.label
// const stock = product.stock

// label: productLabel => rename the label 
// rating = 5 gives us a default value 
const {label: productLabel, stock, rating = 5} = product 
console.log(productLabel, " ", stock)
// undefined stored, since it is not in product 
console.log(rating)

// desctructure inside the function 
const transaction = (type, {label , stock = 0} = {}) => {
    console.log(type, label , stock)
}
transaction('order', product)

