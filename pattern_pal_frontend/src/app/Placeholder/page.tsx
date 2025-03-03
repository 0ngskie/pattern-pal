import {apiClient} from "../_api/api_client";

export default async function PlaceholderPage() { //Add async because there is "await"
    
    let endpoint = process.env.API + "users/getAllUsers";
    let data = await apiClient(endpoint, {});

    console.log(JSON.stringify(data))

    return (
        <div>
            <h1>Output</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}