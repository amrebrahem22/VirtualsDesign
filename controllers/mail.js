const nodemailer = require("nodemailer");
const Mail = require('../models/Mail'); 

exports.contact = (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
      });

    let = htmlMessage = `
    <div style="background: #367ef3; padding: 2rem;">
        <div style="width: 80%; margin: auto; background: white; padding: 1rem; color: #333; font-size: 1rem;">
            <h3>Name: ${name} | Email: ${email}</h3>
            <p>'Phone: ${phone}</p>
            <p>Subject: ${subject}</p>
            <div style="box-shadow: 5px 4px 6px 4px rgb(0 0 0 / 30%); padding: 1.3rem 1rem; font-size: 1rem; background: #eff0f3;">${message}</div>
        </div>  
    </div>
     `

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USERNAME, 
        subject: `${name} | ${subject}`,
        text: message,
        html: htmlMessage
    }
    transporter.sendMail(mailOptions, async (error, response) => {
        if(error){
            res.status(400).json(error)
        }else{
            const mail = new Mail({name, email, phone, subject, message})
            const newMail = await mail.save();

            res.status(201).json({mail: newMail, success: true})
        }
    });
}

exports.deleteMail = async (req, res) => {
    try {
        const mail = await Mail.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, mail })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message })
    }
}


exports.listMails = async (req, res) => {
    try {
        const mail = await Mail.find().sort('-createdAt');

        res.status(200).json({ success: true, mail })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message })
    }
}