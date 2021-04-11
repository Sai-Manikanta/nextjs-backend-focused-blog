import dbConnect from '../../utils/dbConnect'
import Blog from '../../models/Blog'
import Head from 'next/head'

const BlogPage = ({ blog }) => {
    const parsedBlog = JSON.parse(blog);

    return ( 
        <div className="p-4 text-gray-600">
            <Head>
                <title>{parsedBlog.title}</title>
            </Head>
            <h1 className="text-2xl">{parsedBlog.title}</h1>
            <p className="mt-2">{parsedBlog.body}</p>
            <span className="py-2 text-sm">Likes {parsedBlog.likes}</span>
        </div>
    );
}
 
export default BlogPage;

export async function getServerSideProps(context){
    const { id } = context.query;

    await dbConnect();

    let blog;
    try {
        blog = await Blog.findById({ _id: id });
    } catch(err){
        return {
            notFound: true
        }
    }

    return {
        props: {
            blog: JSON.stringify(blog)
        }
    }
}