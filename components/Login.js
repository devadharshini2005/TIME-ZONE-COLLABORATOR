import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUserEmail }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent the form from reloading the page
        
        try {
            // Send a POST request to your backend to verify email and password
            const response = await axios.post('http://localhost:9000/login', {
                email: email,
                password: password
            });

            // If login is successful
            if (response.status === 200) {
                localStorage.setItem('isAuthenticated', 'true'); // Save authentication status to local storage
                setUserEmail(email);  // Update the state with user email (optional)
                setError('');  // Clear any previous error messages
                navigate('/');  // Redirect to the homepage (or wherever you want)
            }
        } catch (err) {
            // If there's an error, show the appropriate error message
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={styles.authFormContainer}>
            <form style={styles.authForm} onSubmit={handleLogin}>
                <h2 style={styles.formTitle}>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.inputField}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.inputField}
                    required
                />
                <button type="submit" style={styles.submitButton}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
            </form>
        </div>
    );
};

// CSS styles in JS for better component-based styling
const styles = {
    authFormContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    authForm: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '350px',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    inputField: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        transition: '0.3s ease',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        border: 'none',
        color: 'white',
        fontSize: '1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    socialLogin: {
        marginTop: '20px',
    },
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    socialIcon: {
        fontSize: '1.5rem',
        margin: '0 10px',
        cursor: 'pointer',
        color: '#667eea',
        transition: 'color 0.3s ease',
    },
};

export default Login;
