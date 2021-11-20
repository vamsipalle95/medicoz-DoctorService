import jwt from 'jsonwebtoken';

export const authenticate = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        if(token){
            jwt.verify(token,process.env.SECRET_CODE,async (err,decode)=>{
                if(err) return res.status(401).json({status:"error",message:"token is not valid "})
                req.user = decode
                next()
            })
        }
        else {
            return res.status(401).send({status:'error',message:"No token, please Authorize "})
        }
    }catch(err){
        res.status(403).json({status:"error",message:"Forbidden you are not allowed"})
    }
}