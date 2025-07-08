import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_KEY:string | undefined = process.env.JWT_KEY;

export function generateToken(payload:JwtPayload):string{
    if(JWT_KEY===undefined){
        throw new Error('JWT_KEY is not defined');
    }
    return jwt.sign(payload, JWT_KEY as string,{expiresIn:'12h'});
}
export function verifyToken(token:string):string | JwtPayload | null{
    if(JWT_KEY===undefined){
        throw new Error('JWT_KEY is not defined');
    }
    try{

    return jwt.verify(token,JWT_KEY );

    }catch{
        return null;
    }
}