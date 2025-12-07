// Check if user is logged in and has admin role
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userRole = sessionStorage.getItem('userRole');
    const userEmail = sessionStorage.getItem('userEmail');

    if (!isLoggedIn || userRole !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = '../login/login.html';
        return;
    }

    // Display user email
    document.getElementById('userName').textContent = userEmail;
});

// Sidebar navigation
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all sections
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        const sectionId = item.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Update page title
        const sectionName = item.textContent.trim();
        pageTitle.textContent = sectionName;
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = '../login/login.html';
    }
});

// Add Product Button
document.getElementById('addProductBtn').addEventListener('click', () => {
    alert('Add Product feature - Connect to database to add new products');
});

// Add Employee Button
document.getElementById('addEmployeeBtn').addEventListener('click', () => {
    alert('Add Employee feature - Connect to database to add new employees');
});

// Edit buttons
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Edit feature - Connect to database to edit this item');
    });
});

// Delete buttons
document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this item?')) {
            alert('Delete feature - Connect to database to delete this item');
        }
    });
});

// View buttons
document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('View details - Connect to database to show full details');
    });
});

// Settings save button
const settingsSection = document.getElementById('settings');
if (settingsSection) {
    const saveBtn = settingsSection.querySelector('.btn-primary');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Settings saved successfully!');
        });
    }
}