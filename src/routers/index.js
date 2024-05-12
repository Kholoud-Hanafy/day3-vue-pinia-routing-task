import HomeComponent from '../components/HomeComponent'
import AboutComponent from '../components/AboutComponent'
import BooksComponent from '../components/BooksComponent'
import ContactComponent from '../components/ContactComponent'
import BookDetailesComponent from '../components/BookDetailesComponent'
import NotFoundComponent from '../components/NotFoundComponent'
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '/contact',
    component: ContactComponent
  },
  {
    path: '/books',
    component: BooksComponent
  },
  {
    path: '/bookdetails/:id',
    component: BookDetailesComponent
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundComponent
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
