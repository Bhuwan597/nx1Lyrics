import * as jose from 'jose'
export default async function verifyToken(token){
    const signature = new TextEncoder().encode(process.env.JWT_SECRET)
    return await jose.jwtVerify(token, signature)
}