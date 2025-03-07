"use client";
import { useState } from 'react';
import axios from 'axios';
export default function Login() {
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add login logic here
        try {
            const response = await axios.post('http://localhost:4000/users/login', formData);
            console.log(response.data);
            // Handle successful login response
          } catch (error) {
            console.error(error);
            // Handle error response
          }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mt-40 flex items-center justify-center max-h-screen bg-gray-100 p-2">
            <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md max-h-screen overflow-auto">
                <h1 className="text-2xl font-bold text-center mb-3">Login to your Account</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="usernameOrEmail" className="block text-lg">Username or Email</label>
                        <input
                            type="text"
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-lg">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="mt-7 absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-blue-600">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}