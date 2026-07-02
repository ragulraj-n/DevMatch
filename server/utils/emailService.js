const { Resend } = require("resend");
const ApiError = require("./ApiError");

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async (toemail,subject,text,html) => {
    const { data, error} = await resend.emails.send({
    from: 'DevMatch <onboarding@resend.dev>',
    to: toemail,
    subject,
    html,
    text,
    });
    if(error) throw new ApiError(400,null,"Error in sending email",error);
}

module.exports = {sendEmail};