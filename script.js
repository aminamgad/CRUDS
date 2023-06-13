let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle")
let searchCategory = document.getElementById("searchCategory")
let printt = document.getElementById("print")
let deleteAlll = document.getElementById("deleteAll")
let updateTh = document.getElementById("updateth")
let Deleteth = document.getElementById("Deleteth")



let mood = 'create';
let t;
// console.log(submit);

title.focus();



//get Total

function getTotal(params) {
    if (price.value != '') {
       let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
       total.innerHTML = result ;
       total.style.background="#040";
    }
    else{
        total.innerHTML = '';
        total.style.background = 'orangered';
    }
}
//create product

let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [] ;
}

submit.onclick = function(){
    let newPro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }


    if (title.value != '' && price.value != '' && category.value != '') {
        
    if (mood === 'create') {
            if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[t] = newPro;
        mood = 'create';
        submit.innerHTML = "Create";
        submit.style.background="#fff";
        submit.style.color="#000";
        count.style.display='block';
    }
    clearData();
    }else{
        if(title.value === ''){
           alert(' Title required');
           title.focus();
        }
        else if(price.value === ''){
            alert(' Price required');
            price.focus();
        }
        else{
            alert(' Category required');
            category.focus();
        }
    }

    // dataPro[dataPro.length] = newPro;

    //save localstorage
    localStorage.setItem('product' , JSON.stringify(dataPro));
    getTotal();
    showData();
}

//clear inputs

function clearData(params) {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    title.focus();
}

//read

function showData(params) {
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
         table += `
         <tr>
         <td>${i + 1}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
       </tr>
`
        
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All(${dataPro.length})</button>`
    }else{
        btnDeleteAll.innerHTML = '' ;
    }
}
showData();
//count



//delete

function deleteData(i) {
    dataPro.splice(i , 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//update

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = 'update';
    if (mood === 'update') {
    submit.style.background="#040";
    submit.style.color="#fff";
    }
    title.focus();
    t = i;
    // submit.onclick = function(){
    //     dataPro[i].title = title.value;
    //     dataPro[i].price = price.value;
    //     dataPro[i].taxes = taxes.value;
    //     dataPro[i].ads = ads.value;
    //     dataPro[i].discount = discount.value;
    //     dataPro[i].total = total.innerHTML;
    //     dataPro[i].category = category.value;
    //     submit.innerHTML = "Create";
    //     submit.style.background="#fff";
    //     submit.style.color="#000";    
    //     clearData();
    //     showData();
    // }
}

//search

let searchMood = 'title';

function getSearchMood(id) {
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
        search.value.toLowerCase();
    }else{
        searchMood ='category' ;
        search.placeholder = 'Search By Category';
        search.value.toLowerCase();
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            dataPro[i].title.toLowerCase().includes(value.toLowerCase())
            ?table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
   `
            :''
        }
    }else{
        for (let i = 0; i < dataPro.length; i++) {
            dataPro[i].category.toLowerCase().includes(value.toLowerCase()
            )
            ?table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
   `
            :''
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
let update = document.getElementById("update")
let deletee = document.getElementById("delete")

//clean data
 function hide() {
     let inputs = document.getElementById('in');
     inputs.style.display = "none";
     search.style.display = "none";
     searchCategory.style.display = "none";
     searchTitle.style.display = "none";
     submit.style.display = "none";
     deleteAlll.style.display = "none";
     printt.style.display = "none";
     updateTh.style.display = "none";
     Deleteth.style.display = "none";
     let table = '';

     for (let i = 0; i < dataPro.length; i++) {
          table += `
          <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].category}</td>
        </tr>
 `
         
     }
 
     document.getElementById('tbody').innerHTML = table;
     
}
 function show() {
     let inputs = document.getElementById('in');
     inputs.style.display = "block";
     search.style.display = "block";
     searchCategory.style.display = "block";
     searchTitle.style.display = "block";
     submit.style.display = "block";
     deleteAlll.style.display = "block";
     printt.style.display = "block";
     updateTh.style.display = "block";
     Deleteth.style.display = "block";
     let table = '';

     for (let i = 0; i < dataPro.length; i++) {
          table += `
          <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">Delete</button></td> 
        </tr>
 `
         
     }
 
     document.getElementById('tbody').innerHTML = table;
     
}
function prinT() {
    hide();
    window.print();
    show();
}