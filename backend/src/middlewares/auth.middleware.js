import jwt from "jsonwebtoken"


function authMiddleware(req, res, next) {
    const token = req.headers.token.split(" ")
    if (!token) {
        return res.status(401).json({ message: "Token not provided" })
    }
    // console.log(token[0]);
    if(token[0]!="Bearer"){
        return res.status(401).json({ message: "Token provided is wrong" })
    }

    // jwt.verify(token,process.env.JWT_SECRET)

    try {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET)

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" })
    }

}

export {authMiddleware}