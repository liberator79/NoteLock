


const registerUser = async (name, email, password) => {
    const result = {};
    try {
        const response = await fetch(SIGNUP_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        result.token = response;
    } catch (error) {
        result.error = "Something went wrong please try again later";
    }
    return result
}

export default registerUser;