let imageResult = document.querySelector(".image-result");
let textPrompt = document.getElementById("text-prompt");
let submitButton = document.getElementById("submit");
let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
let progress = document.querySelector(".progress");

progress.style.display = "none";

submitButton.addEventListener("click", function() {
    progress.style.display = "block";
    const response = fetch('/image/generate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'message':textPrompt.value})
    })
    .then(response => response.json())
    .then(data => {
        // push to the front of the list
        if(data.length > 0) {
            imageResult.innerHTML = "";
            let image = document.createElement("img");
            image.src = data[0];
            image.style.width = "100%";
            image.style.height = "auto";
            imageResult.appendChild(image);
            //add a download button that will download the image
            // let downloadButton = document.createElement("a");
            // downloadButton.href = data[0]
            // downloadButton.download = "output.png";
            // downloadButton.innerHTML = "Download";
            // imageResult.appendChild(downloadButton);
            // downloadButton.click();

            
        }
        progress.style.display = "none";
    }).catch(error => {
        console.log(error);
        progress.style.display = "none";
    });
})
