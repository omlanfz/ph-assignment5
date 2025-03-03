// Home page

const colors = ["bg-[#F4F7FF]", "bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-red-200", "bg-purple-200"];
let currentIndex = 0;

document.getElementById("change-bg-btn").addEventListener("click", function () {
  const body = document.body;

  // Remove the current background color
  body.classList.remove(...colors);

  // Get a new random index (different from the current index)
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * colors.length);
  } while (newIndex === currentIndex);

  currentIndex = newIndex;

  // Add the new background color class
  body.classList.add(colors[currentIndex]);
});


function updateDate() {
  const dateElement = document.getElementById("current-date");

  // Get the current date
  const today = new Date();
  const optionsDay = { weekday: 'short' };
  const optionsDate = { month: 'short', day: '2-digit', year: 'numeric' };

  const day = today.toLocaleDateString("en-US", optionsDay);
  const date = today.toLocaleDateString("en-US", optionsDate);

  // Set the formatted date
  dateElement.innerHTML = `${day} , <br> ${date}`;
}

// Call the function when the page loads
window.onload = updateDate;

let totalTask = localStorage.getItem('totalTask');
if (totalTask === null) {
  totalTask = 0;  // If no value is found, initialize to 0
} else {
  totalTask = parseInt(totalTask);
}
document.getElementById('total-task').textContent = totalTask;

document.querySelectorAll(".complete-btn").forEach(button => {
  button.addEventListener("click", function (event) {
    console.log(event);
    button.disabled = true;
    button.classList.add('cursor-not-allowed', 'opacity-50');
    
    const alertBox = document.getElementById("custom-alert");
    alertBox.classList.remove("hidden");
    document.getElementById("alert-btn").addEventListener("click", function() {
        alertBox.classList.add("hidden");

        if (assignedTask === 0) {
          const secondAlert = document.createElement("div");
          secondAlert.setAttribute("role", "alert");
          secondAlert.className = "alert alert-info alert-soft fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-lg p-5";
          secondAlert.innerHTML = `<span>Congrats! No more tasks left!</span>`;
    
          document.body.appendChild(secondAlert);
    
          setTimeout(() => {
            secondAlert.remove(); // Hide the second alert after a few seconds
          }, 3000);
        }
    })
    // setTimeout(() => {
    //   alertBox.classList.add("hidden");
    // }, 3000);

    let assignedTask = parseInt(document.getElementById('assigned-task').textContent);
    if (assignedTask > 0) assignedTask--;
    document.getElementById('assigned-task').textContent = assignedTask;

    // let totalTask = parseInt(document.getElementById('total-task').textContent);
    totalTask++;
    document.getElementById('total-task').textContent = totalTask;
    localStorage.setItem('totalTask', totalTask);

    // Get the current time
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    let timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    let cardBody = this.closest(".card-body");

    let taskName = cardBody.querySelector(".task-name").innerText;

    // Create a new message div
    let messageDiv = document.createElement("div");
    messageDiv.className = "bg-[#F4F7FF] p-4 rounded-md font-light";

    messageDiv.innerHTML = `<span>You have completed the task ${taskName} at ${timeString}</span>`;

    // Append the new message to the container
    document.getElementById("messagesContainer").appendChild(messageDiv);
  });
});


document.querySelector('#clear-btn').addEventListener("click", function () {
  document.getElementById("messagesContainer").innerHTML = '';
});


// Blog page

