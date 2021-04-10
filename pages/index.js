import Head from 'next/head'

export default function Home() {
  console.log("Mongodb", process.env.MONGODB_URI);
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello wrold!</h1>
    </div>
  )
}
