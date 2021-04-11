import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import dbConnect from '../../../utils/dbConnect'
import Admin from '../../../models/Admin'

export default NextAuth({
  session: {
      jwt: true
  },
  providers: [
    Providers.Credentials({
        async authorize(credentials) {
            await dbConnect();

            const admin = await Admin.findOne({ userName: credentials.admin }).exec();

            if((!admin) || (admin.password !== credentials.password)){
                throw new Error('Incorrect info')
            }

            return {
                admin: 'Admin333'
            }
        }
    })
  ]
})