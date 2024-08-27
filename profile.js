document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".edit-profile-button");
    const profileInfo = document.querySelector(".profile-info");
    const editProfileContainer = document.querySelector(".edit-profile-container");
  
    // Event listener for the edit button
    editButton.addEventListener("click", function () {
      // Hide the edit button after it is clicked
      editProfileContainer.style.display = "none";
  
      // Get current values
      const nameText = document.querySelector(".profile-info p:nth-child(1) strong").nextSibling.textContent.trim();
      const emailText = document.querySelector(".profile-info p:nth-child(2) strong").nextSibling.textContent.trim();
      const roleText = document.querySelector(".profile-info p:nth-child(3) strong").nextSibling.textContent.trim();
  
      // Replace content with input fields
      profileInfo.innerHTML = `
        <p><strong>Name:</strong> <input type="text" id="name-input" value="${nameText}" /></p>
        <p><strong>Email:</strong> <input type="email" id="email-input" value="${emailText}" /></p>
        <p><strong>Role:</strong> <input type="text" id="role-input" value="${roleText}" /></p>
        <div class="save-profile-container">
          <button class="save-profile-button"><i class="fa fa-save"></i> Save Profile</button>
        </div>
      `;
  
      // Add event listener for the save button
      document.querySelector(".save-profile-button").addEventListener("click", saveProfile);
    });
  
    function saveProfile() {
      // Get updated values from the input fields
      const updatedName = document.getElementById("name-input").value;
      const updatedEmail = document.getElementById("email-input").value;
      const updatedRole = document.getElementById("role-input").value;
  
      // Replace input fields with the updated text
      profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${updatedName}</p>
        <p><strong>Email:</strong> ${updatedEmail}</p>
        <p><strong>Role:</strong> ${updatedRole}</p>
      `;
  
      // Show the edit button again after saving
      editProfileContainer.style.display = "block";
    }
  });
  