import Head from 'next/head'
import Link from 'next/link'

import dbConnect from '../utils/dbConnect'
import Blog from '../models/Blog'

export default function Home({ blogs }) {
  const parsedBlogs = JSON.parse(blogs);

  return (
    <div className="max-w-screen-md mx-auto border p-8">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-2xl">REviEW ZonE!</h1>
      <div className="">
        <h2>All Blogs</h2>
        {parsedBlogs.map(blog => (
          <div key={blog._id} className="border p-4 mt-2 text-gray-600 bg-gray-100 rounded">
            <Link href={`/blogs/${blog._id}`}>
              <a>
                <h3>{blog.title}</h3>
                <span>Likes {blog.likes}</span> 
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  await dbConnect();

  const blogs = await Blog.find({});

  return {
    props: {
      blogs: JSON.stringify(blogs)
    }
  }
}
