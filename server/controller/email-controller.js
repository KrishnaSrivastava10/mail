import Email from "../model/email.js"


// export const saveSentEmails = (request,response) => {
//     try {
//         const email = new Email(request.body);
//         email.save();

//         response.status(200).json('email saved successfully')
//     } catch (error) {
//         response.status(500).json(error.message)
//     }
// }

export const saveSentEmails = async (request, response) => {
    try {
        const email = new Email(request.body);
        await email.save();
        response.status(200).json({ message: '✅ Email saved successfully' });
    } catch (error) {
        console.error("Error saving email:", error);
        response.status(500).json({ error: error.message });
    }
};
