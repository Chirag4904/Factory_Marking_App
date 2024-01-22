document.addEventListener("DOMContentLoaded", function () {
  // Get the image container
  const imageContainer = document.getElementById("imageContainer");

  const buttonImages = {
    r1Button: "A TO 1.jpg",
    r2Button: "1 TO 2.jpg",
    r3Button: "2 TO 3.jpg",
    r4Button: "3 TO 4.jpg",
    r5Button: "4 TO 5.jpg",
    r6Button: "5 TO 6.jpg",
    r7Button: "6 TO 7.jpg",
    // middle: "FG-01.jpg",
    // middleLeft: "FG-01.jpg",
  };

  // Add click event listener to each image segment
  for (const segmentId in buttonImages) {
    const segment = document.getElementById(segmentId);
    if (segment) {
      segment.addEventListener("click", function () {
        // Store the ID of the clicked button before hiding all buttons
        const clickedButtonId = segmentId;

        // Hide all buttons
        hideAllButtons();
        // Change the background image of the entire container
        document.getElementById("mainimg").style.display = "none";
        imageContainer.style.background = `url('${buttonImages[segmentId]}') center/cover`;
        imageContainer.style.height = "100vh";
        // Toggle the button's display property
        segment.style.display = "none";
        segment.classList.add("active");

        // Retrieve details from localStorage
        const details = JSON.parse(localStorage.getItem(segmentId)) || {
          title: "Default Title",
          content: "Default Content",
        };

        // Update the sidebar content
        updateSidebar(details.title, details.content);
        // editDetails();
      });
    }
  }

  function hideAllButtons() {
    const buttons = document.querySelectorAll(".point-button");
    for (const button of buttons) {
      button.style.display = "none";
    }
  }

  function updateSidebar(title, content) {
    // Replace this with your logic to update the sidebar content
    const sidebarTitleEle = document.getElementById("sidebarTitle");
    sidebarTitleEle.innerText = title;
    const sidebarContentEle = document.getElementById("sidebarContent");
    sidebarContentEle.innerText = content;
    // sidebar.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
  }

  document.getElementById("editbtn").addEventListener("click", function () {
    editDetails();
  });

  function editDetails() {
    console.log("first");
    // Enable editing of title and content
    const sidebarTitle = document.getElementById("sidebarTitle");
    const sidebarContent = document.getElementById("sidebarContent");

    sidebarTitle.contentEditable = true;
    sidebarContent.contentEditable = true;

    // Optionally, add some visual indication that the user is in edit mode
    sidebarTitle.classList.add("edit-mode");
    sidebarContent.classList.add("edit-mode");
  }

  document.getElementById("savebtn").addEventListener("click", function () {
    saveDetails();
  });
  function saveDetails() {
    // Disable editing of title and content
    document.getElementById("sidebarTitle").contentEditable = false;
    document.getElementById("sidebarContent").contentEditable = false;

    // Retrieve edited details
    const editedTitle = document.getElementById("sidebarTitle").innerText;
    const editedContent = document.getElementById("sidebarContent").innerText;

    // Get the key (button ID) dynamically
    console.log(document.querySelector(".point-button.active"), "fegeg");
    const key = document.querySelector(".point-button.active").id;
    console.log(key);

    // Update localStorage with edited details
    const updatedDetails = { title: editedTitle, content: editedContent };
    localStorage.setItem(key, JSON.stringify(updatedDetails));
  }

  function saveDefaultDetails(key, defaultDetails) {
    // Check if the key is already in localStorage
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaultDetails));
    }
  }

  // Save details to localStorage (e.g., call this when setting up the page)
  saveDefaultDetails("r1Button", { title: "1", content: "Details for 1" });
  saveDefaultDetails("r2Button", { title: "2", content: "Details for 2" });
  saveDefaultDetails("r3Button", { title: "3", content: "Details for 3" });
  saveDefaultDetails("r4Button", { title: "4", content: "Details for 4" });
  saveDefaultDetails("r5Button", { title: "5", content: "Details for 5" });
  saveDefaultDetails("r6Button", { title: "6", content: "Details for 6" });
});
