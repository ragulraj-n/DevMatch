
const nodemailer = require("nodemailer");
const {USER_EMAIL,USER_PASS} = require("../config/constant")
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: USER_EMAIL,
        pass: USER_PASS,
    },
    family: 4,
});

const sendEmail = async (to,subject,text,html) =>{
    try{
        const info = await transporter.sendMail({
        from:`"DevMatch" <${USER_EMAIL}>`,
        to,
        subject,
        text,
        html,
    });

        return info;
    }catch(err){
        console.error("Email error:", err);
        throw new Error("Email failed");

    }
}

module.exports = {sendEmail}; 