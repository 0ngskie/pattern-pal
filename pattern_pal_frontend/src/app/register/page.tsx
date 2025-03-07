"use client";
import { useState } from 'react';
import axios from 'axios';
export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        try{
            const response = await axios.post('http://localhost:4000/users/register', formData);
            console.log(response.data);
            alert('Registration successful!');
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }catch(error){
            console.log(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-2">
            <div className="mt-35 p-4 bg-white shadow-lg rounded-lg w-full max-w-md max-h-screen overflow-auto">
                <h1 className="text-2xl font-bold text-center mb-3">Register</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-lg">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-lg">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-lg">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
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
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-lg">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
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
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                    <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-blue-600">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}