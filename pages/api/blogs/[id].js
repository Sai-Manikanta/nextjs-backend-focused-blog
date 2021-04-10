export default function handler(req, res){
    const { method } = req;

    switch(method){
        case 'PUT':
            res.status(200).json({ message: 'update put req' })
          break
        case 'DELETE':
            res.status(200).json({ message: 'Delete req' })
          break
        default:
          res.setHeader('Allow', ['PUT', 'DELETE'])
          res.status(405).end(`Method ${method} Not Allowed`)
    }
}