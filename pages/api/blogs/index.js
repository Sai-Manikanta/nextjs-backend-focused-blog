import { getSession } from 'next-auth/client'

import dbConnect from '../../../utils/dbConnect'
import Blog from '../../../models/Blog'

export default async function handler(req, res){
    const { method } = req;

    await dbConnect();

    const session = await getSession({ req: req });
    if(!session){
      res.status(401).json({ message: 'Failed!' })
      return;
    }

    switch(method){
        case 'POST':
            try {
              const blog = await Blog.create( req.body )
              res.status(201).json({ success: true, data: blog })
            } catch (error) {
              res.status(400).json({ success: false })
            }
          break
        default:
          res.setHeader('Allow', ['POST'])
          res.status(405).end(`Method ${method} Not Allowed`)
    }
}