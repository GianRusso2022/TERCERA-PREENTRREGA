import twilio from "twilio"
import * as dotenv from "dotenv"
dotenv.config({ path: "./.env" })


const sid = process.env.twilio_account_SID
const auth = process.env.twilio_auth_token
const phone = process.env.twilio_phone_number


export const sendSms = async (req, res) => {
    const sid = process.env.twilio_account_SID
    const auth = process.env.twilio_auth_token
    const phone = process.env.twilio_phone_number

    const client = twilio(sid, auth)
    client.messages.create({
        from: phone,
        to: "+542975419654",
        body: "mensaje de prueba desde twilio"
    })
        .then(result => console.log("message sent", result))
        .catch((error) => console.log(error))
    res.send({ message: "msj sent" })


}