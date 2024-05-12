
<template>
  <div class="container">
    <div class="content">
      <template> {{fetchBookDetails($route.params.id)}}</template>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div class="book-info">
          <div class="info-left">
            <img :src="book.Image" alt="Book Cover">
          </div>
          <div class="info-right">
            <p>Title: {{ book.Name }}</p>
            <p>Author: {{ book.Author }}</p>
            <p>Category: {{ book.Category }}</p>
            <p>Pages: {{ book.Pages }}</p>
            <p>Price: ${{ book.Price }}</p>
          </div>
        </div>
    
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {},
      loading: true
    };
  },
  mounted() {
    this.fetchBookDetails();
  },
  methods: {
    async fetchBookDetails(_id) {
      try {
        const response = await fetch(`http://localhost:5000/books/${_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.book = data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching book details:', error);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; 
}




.book-info {
  display: flex;
}

.info-left {
  flex: 1;
  padding-right: 20px; 
}

.info-right {
  flex: 1;
}

</style>
