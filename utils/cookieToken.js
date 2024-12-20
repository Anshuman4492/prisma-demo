import getJwtToken from "../helpers/getJwtToken.js";

const cookieToken = (user,res) =>{
    const token = getJwtToken(user.id);
    const options = { 
        expires: new Date(
            // Expire the token after 3 days
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    user.password = undefined;
    res.status(200).cookie('token', token,options).json({ 
        success: true,
        token,
        user
    });
}
export default cookieToken;