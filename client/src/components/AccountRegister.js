import '../style/Accounts.css';
import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';
import '../style/Accounts.css';

const RegisterForm = () => {
    const { register } = useRegister();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regcode, setRegcode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        register(username, password, regcode);
    };

    return (
        <div className='div-accounts'>
            <br />
            <h1>ETS Labs Inventory Registration Page</h1>
            <br />
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder='First Name' />
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='Last Name' />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Proper Email' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password Here' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Confirm Password' />
                <input type="text" value={regcode} onChange={(e) => setRegcode(e.target.value)} placeholder="Registration Code" />
                <button variant='primary' type="submit" className='buttonAcc'>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;