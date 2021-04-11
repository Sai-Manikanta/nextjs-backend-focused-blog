import { getSession, signOut } from 'next-auth/client'

import dbConnect from '../../utils/dbConnect'
import Blog from '../../models/Blog'
import BlogList from '../../components/admin/BlogList';
import CreateBlog from '../../components/admin/CreateBlog';
import DeleteBlog from '../../components/admin/DeleteBlog';
import UpdateBlog from '../../components/admin/UpdateBlog'

const AdminDashBoard = ({ blogs }) => {
    const parsedBlogs = JSON.parse(blogs);

    return ( 
        <div className="p-8 max-w-screen-md border mx-auto text-gray-700">
            <div className="flex justify-between bg-indigo-100 p-4">
                <h1 className="font-medium">Admin dash board</h1>
                <button onClick={() => signOut()}>Logout</button>
            </div>
            <p className="p-4 text-lg">Number of Blogs <span className="text-3xl">{parsedBlogs.length}</span></p>

            <BlogList blogs={parsedBlogs} />
            <CreateBlog />
            <br />
            <DeleteBlog />
            <br />
            <UpdateBlog />
        </div>
     );
}
 
export default AdminDashBoard;

export async function getServerSideProps(context){
    const session = await getSession({ req: context.req });

    await dbConnect();

    const blogs = await Blog.find({});

    if(!session){
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    return {
        props: { 
            session,
            blogs: JSON.stringify(blogs),
        }
    }
}