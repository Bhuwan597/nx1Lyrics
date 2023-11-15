import User from '../src/models/user'
export default async function verifyUser(id){
    return await User.findById(id)
}