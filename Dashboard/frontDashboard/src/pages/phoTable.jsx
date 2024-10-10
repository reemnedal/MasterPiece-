import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tableuser from "./TableUSer";

function TablePho() {
    const [photographers, setPhotographers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotographers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/photographers');
                setPhotographers(response.data); // Adjust based on the structure of your response
            } catch (error) {
                console.error('Error fetching photographer data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotographers();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    return (
        <>
            <br />
            <div className="flex items-center justify-center m-0">
                <div className="overflow-x-auto">
                    <h1 className="text-2xl text-[#704e81]">Photographer Data</h1>
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                            <tr className="bg-blue-gray-100 text-gray-700">
                                <th className="py-3 px-4 text-left">Photographer Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Password</th>
                                <th className="py-3 px-4 text-left">Phone</th>
                                <th className="py-3 px-4 text-left">Address</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            {photographers.map((photographer, index) => (
                                <tr key={index} className="border-b border-blue-gray-200">
                                    <td className="py-3 px-4">{photographer.name}</td>
                                    <td className="py-3 px-4">{photographer.email}</td>
                                    <td className="py-3 px-4">{photographer.password}</td>
                                    <td className="py-3 px-4">{photographer.phone}</td>
                                    <td className="py-3 px-4">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Messages/Delete</a>
                                    </td>
                                </tr>
                            ))}
                            <tr className="border-b border-blue-gray-200">
                                <td className="py-3 px-4 font-medium">Total Photographers</td>
                                <td className="py-3 px-4"></td>
                                <td className="py-3 px-4"></td>
                                <td className="py-3 px-4 font-medium">{photographers.length}</td>
                                <td className="py-3 px-4"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-full pt-5 px-4 mb-8 mx-auto ">
                        <div className="text-sm text-gray-700 py-1 text-center">
                        </div>
                    </div>
                </div>
            </div>
            <Tableuser />
        </>
    );
}

export default TablePho;
