import bcrypt from 'bcryptjs'

const generateHash = async (payload)=>{
    let salt = bcrypt.genSaltSync(10)
    return await bcrypt.hash(payload,salt)
}

export default generateHash