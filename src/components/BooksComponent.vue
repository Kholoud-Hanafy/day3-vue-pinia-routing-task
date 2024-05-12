<template>
   
 <div class="nav p-3">
     <a href="#" class="logo mx-5" @click.prevent="isListVisibale=false"   v-if="isListVisibale==true" >  <i class="fa-solid fa-arrow-left"></i>  </a>
     <button class="btn1   mx-5" @click="isListVisibale= true">WishList</button>
    </div>
     <div class="container">
  <button type="button" class="btn4  w-100" data-bs-toggle="modal" data-bs-target="#addModel"   v-if="isListVisibale==false" >Add BOOk</button>
</div>
   <!-- start card -->
    
    <div class="container ">
      <div class="row" v-if="isListVisibale==false">
        <div class="col-lg-4 " v-for="book in books" :key="book.ISBN">
          <div class="card my-5  mx-5" >
            <router-link :to="'/bookdetails/' + book.id">  <img :src="book.Image" class="card-img-top" :alt="book.Name"> </router-link>
            <div class="card-body">
              <h5 class="card-title">{{ book.Name }}</h5>
              <p class="card-text"><b>Author:</b> {{ book.Author }}</p>
              <p class="card-text"><b>Price:</b> {{ formatCurrency(book.Price)}}</p>
              <p class="card-text"><b>Category:</b> {{ book.Category }}</p>
              <p :class="['card-text', book.Pages >= 300 ? 'more' : '', book.Pages < 300 ? 'less' : '', book.Pages === 180 ? 'none' : '']">Pages: {{ book.Pages }}</p>
              <!-- <button :class="['btn2 mt-2', isExisit===true? 'added':'']" :disabled="isExisit= true"    @click="addToWishlist(book)">Add To List</button> -->
              <button :class="['btn2 mt-2 w-100', book.isAddedToWishlist ? 'added' : '']" @click="addToWishlist(book)">Add To List</button>
               <div   class="btns   my-3 ">
                <button class="btn btn-success mx-2 "  data-bs-toggle="modal" data-bs-target="#updateModel"  @click="openUpdatedBook(book)" >Update</button>
                <button class="btn btn-danger mx-2" @click="deleteBook(book)">Delete</button>
               </div>
               
            </div>
          </div>
        </div>
      </div>
      <div v-else>
      <h3 v-if=" wishList.list.length==0" class="my-5">NO books in your WishList Now</h3>
    </div>
    </div>
    
         
     
    <!-- end card -->

    <!-- start wishlist -->
    <div v-if="isListVisibale==true" >
    <h2 class="mt-4"  v-if=" wishList.list.length>0" >Wishlist</h2>
  
    <table class="table"   v-if=" wishList.list.length>0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in wishList.list " :key="book.ISBN">
        <td>{{ book.Name }}</td>
        <td>{{ book.Author }}</td>
        <td>{{ formatCurrency(book.Price) }}</td>
        <td><button class="btn btn-danger"  @click="removeFromWishList($index)">Remove</button></td>
      </tr>
    </tbody>
  </table>
</div>
    <!-- end wishlist -->

 <!-- modal dialog for adding  -->
 <div class="modal" id="addModel" data-bs-backdrop= "static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title ">Add Book</h5>
      </div>
      <div class="modal-body">
        <input type="text" class="form-controle my-2 w-100" placeholder="ISBN" v-model="newBook.ISBN"  required >
        <input type="text" class="form-controle my-2 w-100" placeholder="Name"  v-model="newBook.Name" required>       
        <input type="text" class="form-controle my-2 w-100" placeholder="Category" v-model="newBook.Category" >
        <input type="text" class="form-controle my-2 w-100" placeholder="Image URl" v-model="newBook.Image">
        <input type="number" class="form-controle my-2 w-100" placeholder="Pages" v-model="newBook.Pages" >
        <input type="text" class="form-controle my-2 w-100" placeholder="Author" v-model="newBook.Author" required>
        <input type="number" class="form-controle my-2 w-100" placeholder="Price" v-model="newBook.Price">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addNewBook">OK</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>


<!-- modal dialog for updateing  -->
 <div class="modal" id="updateModel" data-bs-backdrop= "static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title ">Update Book</h5>
      </div>
      <div class="modal-body">
        <input type="text" class="form-controle my-2 w-100" placeholder="id" v-model="updatedBook.id"  disabled>
        <input type="text" class="form-controle my-2 w-100" placeholder="ISBN" v-model="updatedBook.ISBN"  disabled>
        <input type="text" class="form-controle my-2 w-100" placeholder="Name"  v-model="updatedBook.Name" required>       
        <input type="text" class="form-controle my-2 w-100" placeholder="Category" v-model="updatedBook.Category" >
        <input type="text" class="form-controle my-2 w-100" placeholder="Image URl" v-model="updatedBook.Image">
        <input type="number" class="form-controle my-2 w-100" placeholder="Pages" v-model="updatedBook.Pages" >
        <input type="text" class="form-controle my-2 w-100" placeholder="Author" v-model="updatedBook.Author" required>
        <input type="number" class="form-controle my-2 w-100" placeholder="Price" v-model="updatedBook.Price">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateBook(updatedBook)">Update</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>



</template>

<script>
import {useApiStore} from '@/stores/FetchApiStore'
// import { v4 as uuidv4 } from 'uuid';
export default {
   created (){
       this.fetchData();
    
  },

data: ()=>({


        useApiStore : useApiStore(),
         books : [],
         isListVisibale: false,
         isExisit: false,
        wishList:{

          list:[]
        } ,
        newBook:{
             id:"",
            ISBN:"",
            Name :"",
            Category: "" ,
            Image: "" ,
            Pages: 0,
            Author :"",
            Price: 0 
        },
        updatedBook:{
            id : "",
            ISBN:"",
            Name :"",
            Category: "" ,
            Image: "" ,
            Pages: 0,
            Author :"",
            Price: 0 
        },
       }),
       methods: {

        async fetchData(){
          
           try {
        await this.useApiStore.fetchData();
        this.books = this.useApiStore.books;
      } catch (error) {
        console.error('Error fetching books:', error);
      }

        },





        formatCurrency(value){
    return  new Intl.NumberFormat('ar-eg',{
        style: "currency",
        currency:"EGP",
        minimumFractionDigits:0
    }).format(value); 
},
 
addToWishlist(book) {
    if (!this.isBookInWishlist(book)) {
        book.isAddedToWishlist = true;
        this.wishList.list.push(book);
    }
},
removeFromWishList(index) {
    const removedBook = this.wishList.list.splice(index, 1)[0]; // Remove the book and get the removed item
    if (removedBook) {
        removedBook.isAddedToWishlist = false; // Update the removed book's status
    }
}

,
isBookInWishlist(book) {
    return this.wishList.list.some(item => item.ISBN === book.ISBN);
},

 
   async addNewBook() {
      try {
        // this.newBook.id = uuidv4();
        await this.useApiStore.addNewBook(this.newBook);
        this.fetchData(); 
        this.resetNewBook();
      } catch (error) {
        console.error('Error adding book:', error);
      }
    },
    async deleteBook(book) {
      try {
        await this.useApiStore.deleteBook(book);
        this.fetchData(); 
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    },

openUpdatedBook(book) {
   console.log('Book passed to openUpdatedBook:', book);
    this.updatedBook.id = book.id;
    this.updatedBook.ISBN = book.ISBN;
    this.updatedBook.Name = book.Name;
    this.updatedBook.Category = book.Category;
    this.updatedBook.Image = book.Image;
    this.updatedBook.Pages = book.Pages;
    this.updatedBook.Author = book.Author;
    this.updatedBook.Price = book.Price;
    console.log('Updated book:', this.updatedBook);
},

    async updateBook(updatedBook) {

      try {
           
        await this.useApiStore.updateBook(updatedBook);
        this.fetchData(); // Refresh book list after update
        this.resetUpdatedBook();
      } catch (error) {
        console.error('Error updating book:', error);
      }
    },



 resetNewBook() {
      this.newBook = {
        id: "",
        ISBN: "",
        Name: "",
        Category: "",
        Image: "",
        Pages: 0,
        Author: "",
        Price: 0
      };
    },





 resetUpdatedBook() {
      this.updatedBook = {
        id: "",
        ISBN: "",
        Name: "",
        Category: "",
        Image: "",
        Pages: 0,
        Author: "",
        Price: 0
      };
    },
 // async addNewBook(){
  
//       this.newBook.id = uuidv4();


//       await fetch('http://localhost:5000/books', {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(this.newBook)
//      })
//     //  const lastbooktId = this.books.length > 0 ? Number(this.books[this.books.length - 1].id)+100: 0;
        
//     //     // Assign the id for the new product
//     //    this.newBook.id = lastbooktId.toString();
    
//      this.books.push(this.newBook)
//     //  console.log(res.message, this.newBook)
//      this.newBook ={
//             id:"",
//             ISBN:"",
//             Name :"",
//             Category: "" ,
//             Image: "" ,
//             Pages: 0,
//             Author :"",
//             Price: 0 
//         }
// }, 






// openUpdatedBook(book) {
//     this.updatedBook.id = book.id;
//     this.updatedBook.ISBN = book.ISBN;
//     this.updatedBook.Name = book.Name;
//     this.updatedBook.Category = book.Category;
//     this.updatedBook.Image = book.Image;
//     this.updatedBook.Pages = book.Pages;
//     this.updatedBook.Author = book.Author;
//     this.updatedBook.Price = book.Price;
// },

 
//      async updateBook(Book){
//        await fetch(`http://localhost:5000/books/${Book.id}`,
//         {
//             method : 'PUT',
//             headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(this.updatedBook)
//         }
//        )
//         console.log(Book.id)
//        const index = this.books.findIndex(book => book.id === Book.id);
//         if (index !== -1) {
//             // Update the book in the local array
//             this.books[index] = { ...this.updatedBook };
//         }
//     //  console.log("Book Updated Successfully")

//        this.updatedBook ={
//             id:"",
//             ISBN:"",
//             Name :"",
//             Category: "" ,
//             Image: "" ,
//             Pages: 0,
//             Author :"",
//             Price: 0 
//         }

// },

   



       }







}
</script>







<style scoped>


 .nav{
        display: flex;
        /* align-items: baseline; */
        justify-content: space-between;
        /* background-color: #070722; */
    }
    .nav .logo{
      text-decoration: none;
      background: linear-gradient(to right, #c22292, rgb(31, 31, 207));
  

  -webkit-background-clip: text;
  background-clip: text;
  
  
  color: transparent;
  
  font-size: 25px !important;
    }

    .nav .logo:hover{
    background: linear-gradient(to right,rgb(31, 31, 207), rgb(194, 34, 146) );
  
    
    -webkit-background-clip: text;
    background-clip: text;
    

    color: transparent;
}

.btn4{
     background-color: #070722;
    border: 2px solid #070722 !important;
    padding: 10px;
    color: lightgrey;
    border-radius: 10px;
    font-size: 20px;
    /* font-weight: bold; */
}
 .btn1{
    background-color: #e432ae;
    border: 2px solid #e432ae !important;
    color: white ;
    padding: 10px 30px;
    border-radius: 10px;
    
   

}
.btn2{
  background-color: #070722;
    border: 2px solid #070722 !important;
    color: white ;
    padding: 6px;
    /* margin:0rem 4rem; */
    border-radius: 10px;
    align-items: center;
    

}
.more{
  color:#c22292
}
.less{
  color:#070722
}
.none{
  color: rgb(107, 10, 10)
}
.more,.none,.less{
  font-weight: bold;
}
h3, h2{
  text-align: center;
}
.added{
  background-color: #e432ae;
  border: 2px solid #e432ae !important;
}
.btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>