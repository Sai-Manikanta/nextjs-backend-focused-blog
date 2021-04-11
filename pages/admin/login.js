import { useRef } from 'react';
import { signIn, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const LoginPage = () => {
    const adminInputRef = useRef();
    const passwordInputRef = useRef();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const admin = adminInputRef.current.value;
        const password = passwordInputRef.current.value;

        const result = await signIn('credentials', {
            redirect: false,
            admin,
            password
        });

        if(!result.error){
            router.replace('/admin/dashboard')
        }
    }

    return ( 
        <div className="h-screen flex justify-center items-center text-gray-600">
            <div className="bg-gray-100 p-4 rounded">
                <h1 className="text-2xl text-center">Login</h1>
                <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
                    <input className="py-1 px-2 rounded border" type="text" placeholder="Admin" ref={adminInputRef} />
                    <input className="py-1 px-2 rounded border mt-3" type="password" placeholder="Password" ref={passwordInputRef} />
                    <button className="mt-4 bg-gray-700 text-gray-200 py-1 rounded focus:outline-none hover:bg-gray-800">login</button>
                </form>
            </div>
        </div>
     );
}
 
export default LoginPage;

export async function getServerSideProps(context){
    const session = await getSession({ req: context.req });

    if(session){
        return {
            redirect: {
                destination: '/admin/dashboard'
            }
        }
    }

    return {
        props: { session }
    }
}