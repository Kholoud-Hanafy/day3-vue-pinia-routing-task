import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    books: [],
    loading: false,
    newBook: {
      id: "",
      ISBN: "",
      Name: "",
      Category: "",
      Image: "",
      Pages: 0,
      Author: "",
      Price: 0
    },
    updatedBook: {
      id: "",
      ISBN: "",
      Name: "",
      Category: "",
      Image: "",
      Pages: 0,
      Author: "",
      Price: 0
    }
  }),
  actions: {
    async fetchData() {
      try {
        this.loading = true;
        let res = await fetch('http://localhost:5000/books');
        this.books = await res.json();
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        this.loading = false;
      }
    },
    async addNewBook() {
      try {
        this.newBook.id = uuidv4();
        const response = await fetch('http://localhost:5000/books', {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(this.newBook)
        });
        if (!response.ok) {
          throw new Error('Failed to add book');
        }
        this.books.push(this.newBook);
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
      } catch (error) {
        console.error('Error adding book:', error);
      }
    },
    openUpdatedBook(book) {
      this.updatedBook = { ...book };
    },
    async deleteBook(book) {
      try {
        const response = await fetch(`http://localhost:5000/books/${book.id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Failed to delete book with ISBN ${book.id}.`);
        }
        this.books = this.books.filter(bk => bk.id !== book.id);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    },
    async updateBook(book) {
      try {
        const response = await fetch(`http://localhost:5000/books/${book.id}`, {
          method: 'PUT',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(this.updatedBook)
        });
        if (!response.ok) {
          throw new Error('Failed to update book');
        }
        console.log(JSON.parse(JSON.stringify(this.updatedBook)));

        // console.log(this.updatedBook)
        const index = this.books.findIndex(bk => bk.id === book.id);
        if (index !== -1) {
          this.books[index] = { ...this.updatedBook };
        }
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
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  }
});
