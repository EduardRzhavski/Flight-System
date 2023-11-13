var flights = [
    {
      id: 1,
      from: "Berlin",
      to: "Prague",
      price: 22,
      depart: new Date('2023-11-28'),
      return: new Date('2023-12-12')
    },
    {
      id: 2,
      from: "TLV",
      to: "Berlin",
      price: 22,
      depart: new Date('2023-11-28'),
      return: new Date('2023-12-12')
    },
    {
      id: 3,
      from: "London",
      to: "Lisbon",
      price: 22,
      depart: new Date('2023-11-28'),
      return: new Date('2023-12-12')
    }
  ];

  var cart = [];

  function displayFlights() {
    var flightList = document.getElementById('flightList');
    flightList.innerHTML = '';

    flights.forEach(function (flight) {
      var flightElement = document.createElement('div');
      flightElement.classList.add('flight');
      flightElement.innerHTML = `
        <p>${flight.from} to ${flight.to}</p>
        <p>Price: $${flight.price}</p>
        <p>Departure: ${flight.depart.toDateString()}</p>
        <p>Return: ${flight.return.toDateString()}</p>
        <button onclick="addToCart(${flight.id})">Add to Cart</button>
      `;

      flightList.appendChild(flightElement);
    });
  }

  function displayCart() {
    var cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(function (cartItem) {
      var cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <p>${cartItem.from} to ${cartItem.to}</p>
        <p>Price: $${cartItem.price}</p>
        <p>Travelers: ${cartItem.travelers}</p>
        <button onclick="removeFromCart(${cartItem.id})">Remove</button>
      `;

      cartContainer.appendChild(cartItemElement);
    });
  }

  function addToCart(flightId) {
    var selectedFlight = flights.find(function (flight) {
      return flight.id === flightId;
    });

    var existingCartItem = cart.find(function (cartItem) {
      return cartItem.id === flightId;
    });

    if (existingCartItem) {
      existingCartItem.travelers++;
    } else {
      cart.push({
        id: selectedFlight.id,
        from: selectedFlight.from,
        to: selectedFlight.to,
        price: selectedFlight.price,
        travelers: 1
      });
    }

    displayCart();
  }

  function removeFromCart(flightId) {
    var indexToRemove = cart.findIndex(function (cartItem) {
      return cartItem.id === flightId;
    });

    if (indexToRemove !== -1) {
      cart.splice(indexToRemove, 1);
    }

    displayCart();
  }

  function checkout() {
    var totalAmount = calculateTotalAmount();
    showPopup('Booking Confirmed!', 'Total Amount: $' + totalAmount);

    // Save booked flights in localStorage
    saveBookedFlights();
  }

  function calculateTotalAmount() {
    var totalAmount = 0;

    cart.forEach(function (cartItem) {
      totalAmount += cartItem.price * cartItem.travelers;
    });

    return totalAmount;
  }

  function showPopup(confirmationMessage, totalAmountMessage) {
    var popup = document.getElementById('popup');
    var confirmationMessageElement = document.getElementById('confirmationMessage');
    var totalAmountElement = document.getElementById('totalAmount');

    confirmationMessageElement.textContent = confirmationMessage;
    totalAmountElement.textContent = totalAmountMessage;

    popup.style.display = 'block';
  }

  function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
  }

  function saveBookedFlights() {
    var bookedFlights = JSON.parse(localStorage.getItem('myFlights')) || [];
    
    // Add the current cart items to the booked flights
    cart.forEach(function (cartItem) {
      bookedFlights.push({
        id: cartItem.id,
        from: cartItem.from,
        to: cartItem.to,
        price: cartItem.price,
        travelers: cartItem.travelers
      });
    });

    // Save the updated booked flights in localStorage
    localStorage.setItem('myFlights', JSON.stringify(bookedFlights));
  }

  function getBookedFlights() {
    return JSON.parse(localStorage.getItem('myFlights')) || [];
  }

  // Initial display of flights and cart
  displayFlights();
  displayCart();