import { createRouter, createWebHashHistory } from 'vue-router'
/*import Home from '../views/Home.vue'*/

import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Post from '../views/Post.vue'
import PostList from '../views/PostList.vue'
import Account from '../views/Account.vue'
import PostUpdate from '../views/PostUpdate.vue'
import CommentUpdate from '../views/CommentUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
  },
  {
    path: '/postlist',
    name: 'PostList',
    component: PostList,
  },
  {
    path: '/postupdate',
    name: 'PostUpdate',
    component: PostUpdate,
  },
  {
  path: '/commentupdate',
  name: 'CommentUpdate',
  component: CommentUpdate,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
