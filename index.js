let body = document.querySelector(".body");
let orderLength = document.querySelector("#OrderLength");
let orders = document.querySelector(".orders");
let OrderLength = document.querySelector(".OrderLength");
let form = document.querySelector(".form1");
let formContainer = document.querySelector(".formContainer");
let menu = document.querySelector("#menu");
let nav = document.querySelector(".nav")
let navList = document.querySelector(".navList");
let prices = document.querySelector("#prices");
let table = document.querySelector(".table");
let Order = document.querySelector(".order");
let tableMain = document.querySelector(".tableMain");
let searchInput = document.querySelector(".search");
let nothing = document.querySelector(".nothing");
let CustNumb = document.querySelector("#CustNumb");



// let newList = [];
let newList = JSON.parse(localStorage.getItem("list")) || [];
console.log('orders', newList)
console.log('orders-length', newList.length)

let customers = JSON.parse(localStorage.getItem("customers-data")) || [];;
console.log(customers)
console.log('customers-length', customers.length)


const generateForm = () =>{
  
  formContainer.innerHTML = `
  <div class="form1" data-aos="fade-right" >
  <form >
  <div class="delete" onclick="removeForm()"   style="cursor: pointer;">❌</div>
  <h1>Create order</h1>
                    <label>name:</label>
                    <input type="text" placeholder="name" id="name">
                    
                    <label>price:</label>
                    <input type="text" placeholder="price" id="price" >
                    
                    <label>payment:</label>
                    <select class="paymentSelect">
                    <option value="paid">paid</option>
                    <option value="due">due</option>
                    </select>
                    <label>status:</label>
                    <select class="statusSelect" >
                    <option value="delivered">delivered</option>
                    <option value="pending">pending</option>
                    <option value="return">return</option>
                    <option value="progress">progress</option>
                    </select>
                    <div>
                      <button class="create" >Done</button>
                      </div>
                      
                      <p class="errorMessage"></p>
                      
                      </form>
                      </div>
                      
                      
                      `
                      


let createButton = document.querySelector(".create");
createButton.addEventListener("click", (e) => createOrder(e));

formContainer.classList.remove('hide')


}





menu.addEventListener("click", () =>{
  body.classList.toggle('hideN');
  nav.classList.toggle("hideN2");
  
})




function saveToStorage(newList,customers){
  localStorage.setItem("list", JSON.stringify(newList));
  localStorage.setItem("customers-data", JSON.stringify(customers));
}



const createOrder = (e) => {
  e.preventDefault()
  
  let error = document.querySelector(".errorMessage");
  const nameInput = document.querySelector("#name");
  const priceInput = document.querySelector("#price");
  const paymentSelect = document.querySelector('.paymentSelect');
  const statusSelect = document.querySelector('.statusSelect');
  
  if(priceInput.value == ""){
    error.innerText = "please fill all fields";
    return
  }
  
  let order = {
    name: nameInput.value,
    price: parseInt(priceInput.value),
    payment: paymentSelect.value,
    status: statusSelect.value,
    id: new Date().getTime()
  }
  
  
  newList.push(order)
  saveToStorage(newList,customers)
  
  createOrderItem(newList)
  
  console.log('orders', newList)
  console.log('orders-length', newList.length)
  calculateLength()
  
  removeForm()
  calculateTotalPrice()
  // changeColor()
  console.log(order.id)
  
}






function createOrderItem(newList){
  
  table.innerHTML = ""
  table.innerHTML += newList.map((order) => {
    let statusValue = "";
    if(order.status == "progress"){
      statusValue = "progress";
    } 
    else if(order.status == "delivered") {
      statusValue = "delivered";
    }
    else if(order.status == "return"){
      statusValue = "return"
    }
    else if(order.status == "pending"){
      statusValue = "pending"
    }
    
    return`
    <tr>
    <td><p>${order.name}</p></td>
    <td><p>${order.price}</p></td>
    <td><p>${order.payment}</p></td>
    <td class=${statusValue} id="td"><p>${order.status}</p></td>
    <td class="deleteOrder" style="cursor: pointer;" onclick="removeOrder(${order.id})">❌</td>
    </tr>
    `
  }).join("")
  
  
  
}



createOrderItem(newList);


const calculateLength = () => {
  orderLength.innerText = newList.length
}
calculateLength();

function removeForm() {
  formContainer.classList.add('hide'); 
}




const calculateTotalPrice = () => {
  const listPrices = newList.map((order) => order.price);
  const total = listPrices.reduce((acc,cur) => acc + cur, 0);
  prices.innerText = '$' + total;
};

calculateTotalPrice()


// MY FUNCTION

searchInput.addEventListener("keyup", () => {
  searched() 
})


function searched(){
  let awesomeList = [];
  let searchedItem = searchInput.value.toLowerCase();
  awesomeList = newList.filter(item => item.name.toLowerCase().includes(searchedItem))
  
  let searchedMessage = document.querySelector(".searchedMessage")
  if( awesomeList.length == 0){
    searchedMessage.innerText = "Item not found"
  }
   else{
  searchedMessage.innerText = "";
  }


  
  
  createOrderItem(awesomeList);
  createOrderItem(awesomeList)
}

  


function removeOrder(id){
  
let selectedItem = newList.find((item) => item.id == id);
if(selectedItem !== undefined){
 newList = newList.filter((item) => item.id !== selectedItem.id);
 createOrderItem(newList)
 calculateTotalPrice()
 calculateLength()
 console.log(newList)
 saveToStorage(newList,customers)
 
}}




const generateForm2 = () =>{
  
  formContainer.innerHTML = `
  <div class="form1" data-aos="fade-right" >
  <form>
    <div class="delete" onclick="removeForm()"   style="cursor: pointer;">❌</div>
        <h1>Create Customer</h1>
        <label>name:</label>
        <input type="text" placeholder="name" id="name2">
     
        <label>Location</label>
        <input type="text" placeholder="Location" id="Location" >       
       
        <div>
          <button class="create2" >Done</button>
        </div>

        <p class="errorMessage"></p>
      
      </form>
</div>
`
  
  
  
  let createButton2 = document.querySelector(".create2");
  createButton2.addEventListener("click", (e) => createCustomer(e));
  
  formContainer.classList.remove('hide')
}





const createCustomer = (e) => {
  e.preventDefault();
  const name2 = document.querySelector("#name2");
  const Location1 = document.querySelector("#Location");
  let error2 = document.querySelector(".errorMessage");


  
    if(Location1.value == ""){
      error2.innerText = "please fill all fields";
      return
    }

  let customer = {
    name: name2.value,
    location: Location1.value,
    id: new Date().getTime()
  }

 customers.push(customer);
 saveToStorage(newList,customers)

 console.log(customers)
 createCustomerDetails(customers);
 removeForm()
}


function createCustomerDetails(customers){
  let detaildiv = document.querySelector(".detail-div");
  detaildiv.innerHTML = customers.map((customer) => {
    return`
    <div class="details">
    <img src="Images/icons8-user-30.png" alt="">
    <div>
      <p>${customer.name}</p>
      <p>${customer.location}</p>
      </div>
      <div>
      <p class="deleteCustomer" style="cursor: pointer;" onclick="removeCustomer(${customer.id})">❌</p>
      </div>
     

  </div>
    `
  }).join("")
  CustNumb.innerText = customers.length
  saveToStorage(newList,customers)




}
createCustomerDetails(customers);



function removeCustomer(id){
  
  let selectedCustomer = customers.find((user) => user.id);
  if(selectedCustomer !== undefined){
   customers = customers.filter((user) => user.id !== selectedCustomer.id);
   saveToStorage(newList,customers)
   console.log(customers)
   createCustomerDetails(customers)
}}
  


