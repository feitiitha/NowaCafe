// Get form element
const form = document.getElementById('loginForm');

// Simulated user database (replace with actual database later)
const defaultUsers = [
    // Admin accounts
    { email: 'admin@cafenowa.com', password: 'admin123', role: 'admin' },
    
    // Employee accounts
    { email: 'employee@cafenowa.com', password: 'employee123', role: 'employee' },
    { email: 'barista@cafenowa.com', password: 'barista123', role: 'employee' },
    
    // Customer accounts
    { email: 'customer@cafenowa.com', password: 'customer123', role: 'customer' },
    { email: 'john@example.com', password: 'john123', role: 'customer' }
];

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate email
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate password
    if (!password) {
        alert('Please enter your password');
        return;
    }
    
    // Get registered users from localStorage
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Combine default users with registered users
    const allUsers = [...defaultUsers, ...registeredUsers];
    
    // Find user in combined database
    const user = allUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store user data in sessionStorage
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userRole', user.role);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Redirect based on role
        switch(user.role) {
            case 'admin':
                alert('Login successful! Welcome Admin.');
                window.location.href = '../Admin/admin-dashboard.html';
                break;
            case 'employee':
                alert('Login successful! Welcome Employee.');
                window.location.href = '../Employee/employee-dashboard.html';
                break;
            case 'customer':
                alert('Login successful! Welcome back!');
                window.location.href = '../Landingpage/landing.html';
                break;
            default:
                alert('Unknown role');
        }
    } else {
        alert('Invalid email or password. Please try again.');
    }
});