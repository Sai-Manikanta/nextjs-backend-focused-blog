const BlogList = ({ blogs }) => {
    return ( 
        <div>
            <h2 className="mb-4 border-b pb-2 text-indigo-500">Blogs List</h2>
            <ul className="py-4">
               {blogs.map(blog => (
                  <li key={blog._id} className="mb-2">
                    <span className="font-medium text-indigo-400">{blog.title}</span> id: {blog._id}
                  </li>
               ))}
            </ul>
        </div>
     );
}
 
export default BlogList;