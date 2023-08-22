let user = localStorage.getItem('user');
let counts = localStorage.getItem('counts');
let allCounts = JSON.parse(localStorage.getItem('allCounts')) || {};

// Check if the user is new or returning
if (!user) {
  // Generate a unique user ID
  user = generateUserID();
  localStorage.setItem('user', user);
  counts = [];
  allCounts[user] = 0;
} else {
  counts = JSON.parse(counts) || [];
}

const counterElement = document.querySelector('.counter');
const userCountElement = document.querySelector('.user-count');
const totalCountElement = document.querySelector('.total-count');

function incrementCounter() {
  counts.push(1);
  counterElement.textContent = counts.length;
  userCountElement.textContent = counts.length;
  localStorage.setItem('counts', JSON.stringify(counts));

  allCounts[user] = counts.length;
  localStorage.setItem('allCounts', JSON.stringify(allCounts));

  updateTotalCount();
}

function resetCounter() {
  counts = [];
  counterElement.textContent = counts.length;
  userCountElement.textContent = counts.length;
  localStorage.setItem('counts', JSON.stringify(counts));
}

function updateTotalCount() {
  let totalCount = Object.values(allCounts).reduce((acc, val) => acc + val, 0);
  totalCountElement.textContent = totalCount;
}

// Initialize the counter values on page load
counterElement.textContent = counts.length;
userCountElement.textContent = counts.length;
updateTotalCount();

function generateUserID() {
  return Math.random().toString(36).substr(2, 9);
}
