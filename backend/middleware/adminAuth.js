import jwt from 'jsonwebtoken'
//only admin can acess certain functions

const adminAuth = async (req,res,next) => {

    try {
        const { token } = req.headers;
        if (!token) {
            //After returning the exicution is stoped
            return res.json({success:false,Message:"Not Authorized Login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,Message:"Not Authorized Login againnnn"})
        }
        next()
    } catch (error) {
        console.log(error);
        return res.json({success:false,Message:"Not Authorized"})
    }
}

export default adminAuth;