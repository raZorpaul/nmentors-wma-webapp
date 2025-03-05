const API_URL = import.meta.env.VITE_API_URL;

export const login = async (formData) => {
    try {
        console.log(API_URL+`/auth/login`);
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Check if the response is OK before parsing JSON
        if (!response.ok) {
            return {
                success: false,
                message: `Request failed with status ${response.status}`,
                status: response.status,
            };
        }

        const data = await response.json();

        const isSuccessful =
            response.ok &&
            (data.success ||
                data.message?.toLowerCase().includes('successful') ||
                data.token);

        if (isSuccessful) {
            if (data.token) {
                sessionStorage.clear();
                sessionStorage.setItem("token", data.token);
            }

            return {
                success: true,
                token: data.token,
                message: data.message || "Login successful",
            };
        } else {
            return {
                success: false,
                message: data.message || "Login failed",
                status: response.status,
            };
        }
    } catch (err) {
        console.error("Error during login:", err);
        return {
            success: false,
            message: "Network error or unexpected issue occurred",
            error: err.message,
        };
    }
};
