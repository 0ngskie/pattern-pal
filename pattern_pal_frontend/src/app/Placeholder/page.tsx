import { callAPI } from "../_api/api_client";

export default async function PlaceholderPage() { // Add async because there is "await"

    // Payload Example
    let payload = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'example222User',
        email: 'john.doe222@example.com',
        password: 'examplePassword'
    };

    // callAPI Method (HTTP Method, API Address, "optional payload depending on method")
    let data = await callAPI('POST', 'users/createUser', payload);

    return (
        <div>
            <form>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name"/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name"/>
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

