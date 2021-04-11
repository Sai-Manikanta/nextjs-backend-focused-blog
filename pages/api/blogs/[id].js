import { getSession } from 'next-auth/client'
import dbConnect from '../../../utils/dbConnect'
import Blog from '../../../models/Blog'

export default async function handler(req, res){
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    const session = await getSession({ req: req });
    if(!session){
      res.status(401).json({ message: 'Failed!' })
      return;
    }

    switch(method){
        case 'PUT':
            Blog.findByIdAndUpdate(id, req.body, (err, doc) => {
                if (!err){
                    res.status(200).json({ success: true, data: doc })
                } else {
                    res.status(400).json({ success: false, data: 'No blog found or failed to update' })
                }
            });
          break
        case 'DELETE':
            Blog.findOneAndDelete({ _id: id  }, function (err, doc) {
              if (err){
                  res.status(400).json({ message: 'Deleted' });
              } else {
                  res.status(200).json({ message: 'success', data: doc });
              }
            });
          break
        default:
          res.setHeader('Allow', ['PUT', 'DELETE'])
          res.status(405).end(`Method ${method} Not Allowed`)
    }
}