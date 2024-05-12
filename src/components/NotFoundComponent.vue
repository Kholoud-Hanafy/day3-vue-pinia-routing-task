<template>
   <div>
        <h2 className="hl2">Oops, 404 Error!</h2>
         <div className="theBody">
        <img className="photo" src="https://assets.sololearn.com/404.png" alt="img can not found" />
        <p className="text">We’re sorry, looks like we can’t find the page you are looking for.</p>
        </div> 
   </div>
</template>

<script>
export default {

}
</script>

<style>
.hl2{
    font-size: 35px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #333; 
    margin-top: 30px;
}

.theBody{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
}
.theBody .photo{
    vertical-align: middle;
}
.theBody .text{
    font-size: 18px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #333;
    line-height: 22px;
    max-width: 340px;
    padding: 0px 20px;
}
</style>