import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './ItemList.css'; // Reusing the same styles for consistency

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        designation: '',
        salary: '',
        address: '',
        dob: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/employees`);
            if (Array.isArray(response.data)) {
                setEmployees(response.data);
            } else {
                setEmployees([]);
                console.error("Employee API invalid response", response.data);
            }
            setError(null);
        } catch (err) {
            setError('Failed to fetch employees');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/employees`, newEmployee);
            fetchEmployees();
            setNewEmployee({ name: '', designation: '', salary: '', address: '', dob: '' });
        } catch (err) {
            setError('Failed to add employee');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this employee?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/employees/${id}`);
            fetchEmployees();
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    return (
        <div className="item-list-container">
            <div className="header-actions">
                <h2>👔 Employee Management</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="content-grid">
                <div className="form-card">
                    <h3>Register Employee</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={newEmployee.name}
                                onChange={handleInputChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                name="designation"
                                className="form-input"
                                value={newEmployee.designation}
                                onChange={handleInputChange}
                                required
                                placeholder="Manager"
                            />
                        </div>
                        <div className="form-group">
                            <label>Salary</label>
                            <input
                                type="number"
                                name="salary"
                                className="form-input"
                                value={newEmployee.salary}
                                onChange={handleInputChange}
                                required
                                placeholder="50000"
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-input"
                                value={newEmployee.address}
                                onChange={handleInputChange}
                                placeholder="123 Main St"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                className="form-input"
                                value={newEmployee.dob}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            + Add Employee
                        </button>
                    </form>
                </div>

                <div className="list-card">
                    <h3>Employee Directory</h3>
                    {loading ? (
                        <p>Loading staff...</p>
                    ) : employees.length === 0 ? (
                        <p className="empty-state">No employees found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Salary</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(employees) && employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td>#{emp.id}</td>
                                            <td className="font-medium">{emp.name}</td>
                                            <td>
                                                <span className="badge badge-success">{emp.designation}</span>
                                            </td>
                                            <td>${emp.salary}</td>
                                            <td>{emp.address || '-'}</td>
                                            <td>
                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => handleDelete(emp.id)}
                                                    title="Delete Employee"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
