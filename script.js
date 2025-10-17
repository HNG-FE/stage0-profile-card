// Display current time in milliseconds and update every second
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

updateTime();
setInterval(updateTime, 1000);
