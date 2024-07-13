


const registerUser = async (name, email, password) => {
    const result = {};
    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name })
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

export default registerUser;