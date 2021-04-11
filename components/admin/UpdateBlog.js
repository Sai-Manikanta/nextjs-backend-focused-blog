import { useRef } from 'react';
import { useRouter } from 'next/router'

const DeleteBlog = () => {
    const blogIdInputRef = useRef();

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogId = blogIdInputRef.current.value;

        router.push(`/admin/update-blog/${blogId}`)
    }

    return ( 
        <div>
            <h1 className="mb-4 border-b pb-2 text-indigo-500">Update Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" placeholder="Blog Id" className="py-2 px-3 border" required ref={blogIdInputRef} />
                <button className="p-2 bg-indigo-600 text-indigo-200 mt-4 text-sm rounded">Update</button>
            </form>
        </div>
     );
}
 
export default DeleteBlog;