import { createRouter, createWebHistory } from 'vue-router'

// layouts
import MainLayout from '../layouts/MainLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// pages
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import AddPost from '../pages/admin/AddPost.vue'
import EditPost from '../pages/admin/EditPost.vue'
import Auth from '../pages/admin/Auth.vue'
import Post from '../pages/Post.vue'
import Search from '../pages/Search.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'post/:id', component: Post },
      { path: '/search', component: Search}
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'login', component: Auth },
      { path: '', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'add-post', component: AddPost },
      { path: 'edit-post/:id', component: EditPost }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.fullPath.includes('?page=')) {
      return false
    }
    return { top: 0 }
  }
})

export default router
