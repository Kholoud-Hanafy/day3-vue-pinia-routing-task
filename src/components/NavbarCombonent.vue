<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    

   <router-link to="/books" class="navbar-brand" >BookStore </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          
          <router-link to="/"  class="nav-link active" aria-current="page" >Home </router-link>
        </li>
        <li class="nav-item">
          
          <router-link to="/about" class="nav-link">About </router-link>
        </li>
        <li class="nav-item">
          
          <router-link to="/books" class="nav-link" >Books </router-link>
        </li>
        <li class="nav-item">
          
           <router-link to="/contact"  class="nav-link">Contact Us</router-link> 
        </li>
       
       
      </ul>
      
    </div>

  </div>
</nav>


</template>

<script>
export default {

}
</script>

<style>
.navbar-brand{
      text-decoration: none !important;
      background: linear-gradient(to right, #c22292, rgb(31, 31, 207)) !important;
  
  
  -webkit-background-clip: text !important; 
  background-clip: text !important;
  
  color: transparent !important;
  
  font-size: 25px !important;
}

</style>