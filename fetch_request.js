const API_KEY = "AIzaSyDT9WSwD1QUNzxnI4ycuy_7SB9AG_J-GKc";
fetch("https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&moderationStatus=published&order=time&textFormat=html&videoId=74ijsBhbxSQ&prettyPrint=true&alt=json&key=" + API_KEY)
    .then(response => {
        if (!response.ok) {
            throw new Error("An error occurred");
        }
        return response.json();
    })
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => {
        console.error(error);
    })