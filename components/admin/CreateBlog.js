import { useState } from 'react';
import axios from 'axios'

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [likes, setLikes] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const blog = { title, body, likes };

        axios.post('/api/blogs', blog)
          .then(res => {
              window.alert("Created new Blog");
          })
          .catch(err => console.log(err))
    }

    return ( 
        <div>
            <h1 className="mb-4 border-b pb-2 text-indigo-500">Create Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" placeholder="Title" className="py-2 px-3 border" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Body" className="py-2 px-3 border my-3" value={body} onChange={(e) => setBody(e.target.value)} />
                <input type="text" placeholder="Likes" className="py-2 px-3 border" value={likes} onChange={(e) => setLikes(e.target.value)} />
                <button className="p-2 bg-indigo-600 text-indigo-200 mt-4 text-sm rounded">Create</button>
            </form>
        </div>
     );
}
 
export default CreateBlog;