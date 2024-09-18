const child_uid = document.getElementById('childUID');
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', async () => {
  const parentUid = await getParentUid(); // Assuming you already have this function
  if (parentUid && child_uid.value) {
    await makeParentChild(parentUid, child_uid.value); // Pass the actual child UID value
  } else {
    console.error('Parent UID or Child UID is missing');
  }
  fetchChildProgress();
});

async function makeParentChild(parentUid, childUidValue) {
  try {
    const response = await fetch('/api/makeParentChild', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent_uid: parentUid,
        child_uid: childUidValue,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Parent-child relationship created successfully');
    } else {
      console.error('Error creating parent-child relationship:', data.message);
    }
  } catch (error) {
    console.error('Error making parent-child relationship:', error);
  }
}

async function getParentUid() {
  try {
    const response = await fetch('/api/getParentUid');
    const data = await response.json();

    if (data.success) {
      console.log('Parent UID:', data.parentUID);
      return data.parentUID;
    } else {
      console.error('Parent UID not found');
      return null; // Return null if no parent UID is found
    }
  } catch (error) {
    console.error('Error fetching parent UID:', error);
    return null; // Return null if an error occurs
  }
}

async function fetchChildProgress() {
  try {
    const parentUID = await getParentUid(); // Fetch parentUID asynchronously

    if (!parentUID) {
      console.error('No parent UID available');
      return;
    }

    const response = await fetch(`/getChildProgress?parentUID=${parentUID}`);
    const data = await response.json();

    console.log(data);

    const container = document.getElementById('child_prog'); // The main container where we'll append child progress divs
    container.innerHTML = ''; // Clear the container before appending new data

    console.log(data);
    
    data.forEach(async (child) => {
      try {
        // Fetch child name from the new endpoint
        const nameResponse = await fetch(`/api/getChildName/${child.uid}`);
        const nameData = await nameResponse.json();
        const childName = nameData.success
          ? `${nameData.first_name} ${nameData.last_name}`
          : 'Unknown';

        // Fetch video title from the new endpoint
        const videoResponse = await fetch(
          `/api/getVideoTitle/${child.video_id}`
        );
        const videoData = await videoResponse.json();
        const videoTitle = videoData.success ? videoData.title : 'Unknown';

        // Display child progress
        const childProg = document.createElement('div');
        childProg.classList.add('container');

        childProg.innerHTML = `
            <h3>Child Name: ${childName}</h3>
            <p>Video Title: ${videoTitle}</p>
            <p>Quiz progress</p>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width:${
                (child.quiz_score / 5) * 100
              }%; background-color: lightgreen;">
                <h3>${(child.quiz_score / 5) * 100}%</h3>
              </div>
            </div>
          `;

        container.appendChild(childProg);
      } catch (error) {
        console.error('Error fetching child name:', error);
      }
    });
  } catch (error) {
    console.error('Error fetching child progress:', error);
  }
}

// Call fetchChildProgress when needed
fetchChildProgress();

// Function to get child name from the database by UID
function getChildNameByUid(uid, callback) {
  const query = 'SELECT first_name, last_name FROM Child WHERE uid = ?';

  connection.query(query, [uid], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (results.length > 0) {
      const { first_name, last_name } = results[0];
      callback(null, { first_name, last_name });
    } else {
      callback(null, null); // No matching record found
    }
  });
}

// // Function to sum up all completed videos
// function sumVideosDone(data) {
//   return data.reduce((sum, item) => sum + item.video_done, 0);
// }

// // Function to sum up all quiz scores
// function sumQuizScores(data) {
//   return data.reduce((sum, item) => sum + item.quiz_score, 0);
// }
