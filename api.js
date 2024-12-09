const API_URL = "https://dummyjson.com/users";
export async function fetchUserData(page, limit) {
    try {
        
        const skip = (page - 1) * limit;

        
        const apiUrl = `${API_URL}?limit=${limit}&skip=${skip}`;

        console.log(`Fetching data from: ${apiUrl}`);

        
        const response = await fetch(apiUrl);

        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error("Error during API call:", error);
        alert("Error fetching data. Please try again.");
        return [];
    }
}
