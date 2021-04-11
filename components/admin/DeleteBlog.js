import { useRef } from 'react';
import axios from 'axios'

const DeleteBlog = () => {
    const blogIdInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogId = blogIdInputRef.current.value;

        axios.delete(`/api/blogs/${blogId}`)
          .then(res => {
              console.log('Deleted:', res.data)
              window.alert(`Blog: ${blogId} Deleted`)
          })
          .catch(err => console.log(err))
    }

    return ( 
        <div>
            <h1 className="mb-4 border-b pb-2 text-indigo-500">Delete Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" placeholder="Blog Id" className="py-2 px-3 border" ref={blogIdInputRef} />
                <button className="p-2 bg-indigo-600 text-indigo-200 mt-4 text-sm rounded">Delete</button>
            </form>
        </div>
     );
}
 
export default DeleteBlog;