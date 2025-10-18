import jwt from 'jsonwebtoken'

const authenticate=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(400).send('invalid token');
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.id=decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send('something wents wrong');
    }
}

export default authenticate;