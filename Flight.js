function login() {
  // Get values from the form
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var name = document.getElementById('name').value;
  var isAdmin = document.getElementById('isAdmin').checked;

  // Validate email and password (you can add more robust validation)
  if (email === 'example@email.com' && password === 'password123') {
    // Create user object
    var user = {
      email: email,
      name: name,
      isAdmin: isAdmin
    };

    // Store user object in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    if (isAdmin) {
      showAdminOptions();
    } else {
      hideAdminOptions();
    }

    alert('Login successful!');
  } else {
    alert('Invalid email or password. Please try again.');
  }
}

function logout() {
  // Remove user object from localStorage
  localStorage.removeItem('user');
  hideAdminOptions();
  alert('Logout successful!');
}

function showAdminOptions() {
  var adminOptions = document.querySelector('.admin-options');
  if (adminOptions) {
    adminOptions.style.display = 'block';
  }
}

function hideAdminOptions() {
  var adminOptions = document.querySelector('.admin-options');
  if (adminOptions) {
    adminOptions.style.display = 'none';
  }
}

// Placeholder functions for admin options
function addFlight() {
  alert('Add Flight option clicked!');
}

function searchFlights() {
  alert('Search Flights option clicked!');
}

function sortFlights() {
  alert('Sort Flights by Price option clicked!');
}

function updatePrice() {
  alert('Update Price option clicked!');
}