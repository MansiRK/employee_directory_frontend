
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface EmployeeData {
    name: string;
    email: string;
    role: string;
}

const AddEmployee = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [employee, setEmployee] = useState<EmployeeData>({
        name: '',
        email: '',
        role: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setMessage('');
        setError('');

        try {
            await axios.post(`${API_URL}/employees`, employee);

            setMessage('Employee added successfully!');

            setEmployee({
                name: '',
                email: '',
                role: '',
            });

navigate('/');
        } catch (err) {
            console.error('Error adding employee:', err);
            setError('Failed to add employee. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="employee-form p-4">
                        <h1 className="mb-4">Add Employee</h1>

                        {message && (
                            <div className="alert alert-success">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="form-label"
                                >
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter full name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                 <label
                                    htmlFor="role"
                                    className="form-label"
                                >
                                    Role
                                </label>

                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    className="form-control"
                                    placeholder="Enter your role"
                                    value={employee.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? 'Adding...'
                                        : 'Add Employee'}
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() =>
                                        setEmployee({
                                            name: '',
                                            email: '',
                                            role: '',
                                        })
                                    }
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddEmployee;
