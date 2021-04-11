import { useState } from 'react';
import dbConnect from '../../../utils/dbConnect'
import Blog from '../../../models/Blog'
import { getSession } from 'next-auth/client'
import axios from 'axios'

const UpdateBlogPage = ({ blog }) => {

    let parsedBlog;
    if(!blog){
        return <p>No blog found!</p>
    } else {
        parsedBlog = JSON.parse(blog);
    }

    const [title, setTitle] = useState(parsedBlog.title);
    const [body, setBody] = useState(parsedBlog.body);
    const [likes, setLikes] = useState(parsedBlog.likes);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBlog = { title, body, likes };

        axios.put(`/api/blogs/${parsedBlog._id}`, updatedBlog)
          .then(res => {
              console.log(res.data);
              window.alert("Blog updated Sucssessfully")
          })
          .catch(err => console.log(err))
    }

    return ( 
        <div className="max-w-screen-md mx-auto mt-8 px-8">
            <h1 className="mb-4 border-b pb-2 text-indigo-500">Update Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" placeholder="Title" className="py-2 px-3 border" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Body" className="py-2 px-3 border my-3" value={body} onChange={(e) => setBody(e.target.value)} />
                <input type="text" placeholder="Likes" className="py-2 px-3 border" value={likes} onChange={(e) => setLikes(e.target.value)} />
                <button className="p-2 bg-indigo-600 text-indigo-200 mt-4 text-sm rounded">Create</button>
            </form>
        </div>
     );
}
 
export default UpdateBlogPage;

export async function getServerSideProps(context){
    const session = await getSession({ req: context.req });

    if(!session){
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    await dbConnect();

    const { id } = context.query;

    try {
        const blog = await Blog.findById(id);
        return {
            props: {
                session,
                blog: JSON.stringify(blog)
            }
        }
    } catch(err) {
        return {
            props: {
                session,
                blog: null
            }
        }
    }
}