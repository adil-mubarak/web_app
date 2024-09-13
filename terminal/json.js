// signup
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5555/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();

    if (response.ok) {
        alert(result.message);
    } else {
        alert(`Error: ${result.error || result.message}`);
    }
});

// login

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

 
    const payload = {
        username: username,
        password: password
    };

   
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful!") {
            window.location.href = data.redirect;
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// admin

document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#userTable .row-id');
    rows.forEach((row, index) => {
        row.textContent = index + 1;
    });
});

function fetchUsers() {
    fetch('/admin')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector('#userTable tbody');
            tableBody.innerHTML = ''; 

            users.forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.ID}</td>
                    <td>${user.Username}</td>
                    <td>${user.Password}</td>
                    <td>${user.Email}</td>
                    <td>
                        <form action="/delete/${user.ID}" method="post" style="display: inline;">
                            <input type="submit" value="Delete" class="delete">
                        </form>
                        <form action="/edit/${user.ID}" method="post" style="display: inline;">
                            <input type="submit" value="Edit" class="edit">
                        </form>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', fetchUsers);

// search
document.querySelector('.search').addEventListener('input', function(event) {
    const searchQuery = event.target.value;

    fetch(`/search?search=${searchQuery}`)
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector('#userTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            users.forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.ID}</td>
                    <td>${user.Username}</td>
                    <td>${user.Password}</td>
                    <td>${user.Email}</td>
                    <td>
                        <form action="/delete/${user.ID}" method="post" style="display: inline;">
                            <input type="submit" value="Delete" class="delete">
                        </form>
                        <form action="/edit/${user.ID}" method="post" style="display: inline;">
                            <input type="submit" value="Edit" class="edit">
                        </form>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/home');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        document.getElementById('welcome-message').textContent = `Welcome to Home, ${data.username}`;
    } catch (error) {
        console.error('Error:', error);
    }
});

//create

document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;


    const payload = {
        username: username,
        password: password,
        email: email
    };

    
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect; 
        } else if (data.error) {
            alert(data.error); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// edit

document.getElementById("edit-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch(`/edit/${userID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
           
            console.log("Error:", data);
        }
    })
    .catch(error => console.error("Error:", error));
});

// delete

document.querySelectorAll('.delete').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault(); 

        const form = button.closest('form');
        const id = form.action.split('/').pop(); L

        fetch(`/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect; 
            } else {
                alert(data.message); 
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

// home

document.addEventListener('DOMContentLoaded', function() {
    
    fetch('/home', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
       
        document.getElementById('welcomeMessage').textContent = data.message;
        document.getElementById('userName').textContent = data.user;
    })
    .catch(error => {
        console.error('Error fetching home data:', error);
    });
});

// logout

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('logout').addEventListener('submit', function(event) {
        event.preventDefault(); 

        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        })
        .then(response => response.json())
        .then(data => {
           
            if (data.message === 'Logged out successfully') {
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    });
});