
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Plus, Pencil, Trash2} from "lucide-react"

interface EmployeeData {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date
}

const Employees = () => {
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/employees`
                );
                console.log(response.data.data)
                setEmployees(response.data.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setError('Failed to fetch employees data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [API_URL]);

    
const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
        await axios.delete(`${API_URL}/employees/${id}`);

        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee._id !== id)
        );
    } catch (error) {
        console.error("Error deleting employee:", error);
        setError("Failed to delete employee.");
    }
};


    return (
        <section className="container employees-listing">
            <div className="row employee-listing-header d-flex align-items-center justify-content-around">
                <div className="col-lg-6">
                    <h1>Employee List</h1>
                </div>

                <div className="col-lg-6 text-end">
                    <a href="/add-employee" className="button add-btn">
                        Add Employee
                    </a>
                </div>
            </div>

            <div className="row employee-listing-table mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>

                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3}>Loading employees...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={3}>{error}</td>
                            </tr>
                        ) : employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <>
                                <tr key={`${employee.email}-${index}`}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.role}</td>
                                    <td>
                                        {new Date(employee.createdAt).toLocaleString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true,
                                        })}
                                    </td>

                                    <td><a href={`/edit-employee/${employee._id}`} className="edit-btn"><Pencil/></a></td>
                                    <td><a type="button" className="delete-btn" onClick={() => handleDelete(employee._id)}><Trash2/></a></td>

                                </tr>
                                </>
                                
                                
                            ))
                            
                        ) : (
                            <tr>
                                <td colSpan={3}>No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Employees;
