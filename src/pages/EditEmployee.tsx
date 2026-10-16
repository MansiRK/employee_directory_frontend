
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface EmployeeData {
    _id?: string;
    name: string;
    email: string;
    role: string;
}

const EditEmployee = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState<EmployeeData>({
        name: '',
        email: '',
        role: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) {
            setError('Employee ID is missing.');
            setLoading(false);
            return;
        }

        const fetchEmployee = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await axios.get(
                    `${API_URL}/employees/${id}`
                );

                setEmployee(response.data.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
                setError('Failed to fetch employee data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [API_URL, id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
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

        if (!id) {
            setError('Employee ID is missing.');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const { name, email, role } = employee;

            await axios.patch(`${API_URL}/employees/${id}`, {
                name,
                email,
                role,
            });

            setMessage('Employee updated successfully!');

            navigate('/');
        } catch (error) {
            console.error('Error updating employee:', error);
            setError('Failed to update employee. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="container py-5">
                Loading employee...
            </section>
        );
    }

    if (error && !employee._id && !employee.name) {
        return (
            <section className="container py-5">
                <div className="alert alert-danger">{error}</div>
                <button
                    type="button"
                    className="secondary-button"
                    onClick={() => navigate('/')}
                >
                    Back to Employees
                </button>
            </section>
        );
    }

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="employee-form p-4">
                        <h1 className="mb-4">Edit Employee</h1>

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
                                    Update Employee
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() =>
                                        navigate('/')
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditEmployee;
