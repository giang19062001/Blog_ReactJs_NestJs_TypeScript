import React from 'react'
import BlogList from './components/blogList'
import CreateBlog from './components/createBlog'
import { Navbar } from './components/navbar'

export default function Blog() {
  return (
    <div className='container p-32'>
      <Navbar></Navbar>
      <CreateBlog></CreateBlog>
      <BlogList></BlogList>
    </div>
  )
}
