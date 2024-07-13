import { LOGIN_URL } from "../constants/constants";

const authenticate = async (email, password) => {
    const result = {};
    try {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        result.token = data.token;
    } catch (error) {
        result.error = "Something went wrong please try again later";
    }
    return result
}

export default authenticate