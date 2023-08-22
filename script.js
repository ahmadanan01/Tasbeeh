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

let totalCount = Object.values(allCounts).reduce((acc, val) => acc + val, 0);

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

  totalCount += 1;
  totalCountElement.textContent = totalCount;
  localStorage.setItem('totalCount', totalCount.toString());
}

function resetCounter() {
  counts = [];
  counterElement.textContent = counts.length;
  userCountElement.textContent = counts.length;
  localStorage.setItem('counts', JSON.stringify(counts));
}

// Initialize the counter values on page load
counterElement.textContent = counts.length;
userCountElement.textContent = counts.length;
totalCountElement.textContent = totalCount;

function generateUserID() {
  return Math.random().toString(36).substr(2, 9);
}
