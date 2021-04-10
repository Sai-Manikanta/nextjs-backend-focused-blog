export default function handler(req, res){
    const { method } = req;

    switch(method){
        case 'POST':
            res.status(200).json({ message: 'Post req' })
          break
        default:
          res.setHeader('Allow', ['POST'])
          res.status(405).end(`Method ${method} Not Allowed`)
    }
}