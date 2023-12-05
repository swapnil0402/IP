// Function to create a new user
function createUser() {
    const username = prompt('Enter username:');
    const email = prompt('Enter email:');
  
    if (username && email) {
      fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
        })
        .catch(error => {
          console.error('Error creating user:', error);
          alert('Error creating user');
        });
    } else {
      alert('Username and email are required');
    }
  }
  
  // Function to view all users
  function viewUsers() {
    fetch('http://localhost:3000/viewUsers')
      .then(response => response.json())
      .then(users => {
        if (users.length > 0) {
          const userString = users.map(user => `Username: ${user.username}, Email: ${user.email}`).join('\n');
          alert(`Users:\n${userString}`);
        } else {
          alert('No users found');
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        alert('Error fetching users');
      });
  }
  