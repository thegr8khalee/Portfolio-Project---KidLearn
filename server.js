const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'web_static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web_static', 'landing.html')); // Ensure landing.html is in the 'public' folder
});

const connection = mysql.createConnection({
  host: '13.60.142.95', // Change this to your MySQL host
  user: 'admin', // Change this to your MySQL username
  password: 'kidLearn-mysql', // Change this to your MySQL password
  database: 'kidlearn', // Change this to your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

let childUid = null;
let parentUID = null; // Variable to store child_uid
// import { currentVideoIndex } from './web_static/quiz.js';

// API to return the childUid
app.get('/api/getChildUid', (req, res) => {
  if (childUid) {
    res.json({ success: true, childUid });
  } else {
    res.status(404).json({ success: false, message: 'Child UID not found' });
  }
});

//api to retun parent uid
app.get('/api/getParentUid', (req, res) => {
  console.log('Current parentUID:', parentUID); // Log the current parentUID for debugging

  if (parentUID) {
    res.json({ success: true, parentUID });
  } else {
    res.status(404).json({ success: false, message: 'Parent UID not found' });
  }
});

// Handle POST request to /api/signup
app.post('/api/signup', (req, res) => {
  const { email, password, uid, userType, firstName, lastName, age } = req.body;

  let query;
  let values;

  if (userType === 'child') {
    // Insert into the child table
    query =
      'INSERT INTO Child (email, password, uid, first_name, last_name, age) VALUES (?, ?, ?, ?, ?, ?)';
    values = [email, password, uid, firstName, lastName, age];
  } else {
    // Insert into the parent table
    query =
      'INSERT INTO Parent (email, password, uid, first_name, last_name) VALUES (?, ?, ?, ?, ?)';
    values = [email, password, uid, firstName, lastName];
  }

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ success: false });
    }

    // Set the child's uid if the user is a child
    if (userType === 'child') {
      childUid = uid; // Store the uid in the variable
    } else if (userType === 'parent') {
      parentUID = uid;
    }

    res.json({
      success: true,
      child_uid: userType === 'child' ? uid : parentUID,
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password, userType } = req.body;

  let query = '';
  if (userType === 'parent') {
    query = 'SELECT * FROM Parent WHERE email = ? AND password = ?';
  } else if (userType === 'child') {
    query = 'SELECT * FROM Child WHERE email = ? AND password = ?';
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid user type selected' });
  }

  const values = [email, password];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      const storedUserType = userType === 'parent' ? 'parent' : 'child';

      if (storedUserType === userType) {
        if (userType === 'child') {
          childUid = results[0].uid;
          return res.json({
            success: true,
            userType,
            child_uid: results[0].uid,
          });
        } else {
          parentUID = results[0].uid; // Set parentUID here
          return res.json({
            success: true,
            userType,
            parent_uid: results[0].uid,
          }); // Return parent UID as well
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Incorrect user type selected' });
      }
    }

    res
      .status(404)
      .json({ success: false, message: 'Invalid email or password' });
  });
});

module.exports = { childUid };

// Endpoint to get video and quiz based on index and child's ID
app.get('/api/getContent', (req, res) => {
  const childUID = req.query.childUID;
  const videoIndex = parseInt(req.query.videoIndex) || 1; // Default to 1 if not provided

  if (!childUID) {
    return res.status(400).json({ error: 'Child UID is required' });
  }

  // Fetch child age from the database
  connection.query(
    'SELECT age FROM Child WHERE uid = ?',
    [childUID],
    (error, childResults) => {
      if (error) {
        console.error('Error fetching child data:', error);
        return res.status(500).json({ error: 'Failed to fetch child data' });
      }

      if (childResults.length === 0) {
        return res.status(404).json({ error: 'Child not found' });
      }

      const childAge = childResults[0].age;
      let ageGroup = 1;

      if (childAge >= 3 && childAge <= 5) {
        ageGroup = 1;
      } else if (childAge >= 6 && childAge <= 8) {
        ageGroup = 2;
      } else if (childAge >= 9 && childAge <= 11) {
        ageGroup = 3;
      }

      // Fetch the video data based on the age group and index
      connection.query(
        'SELECT * FROM Video WHERE age_group = ? ORDER BY video_id LIMIT 1 OFFSET ?',
        [ageGroup, videoIndex - 1],
        (videoError, videoResults) => {
          if (videoError) {
            console.error('Error fetching video data:', videoError);
            return res
              .status(500)
              .json({ error: 'Failed to fetch video data' });
          }

          if (videoResults.length === 0) {
            return res
              .status(404)
              .json({ error: 'No more videos for this age group' });
          }

          const video = videoResults[0]; // Access the video

          // Fetch all quiz questions related to this video
          connection.query(
            'SELECT * FROM Quiz WHERE video_id = ?',
            [video.video_id],
            (quizError, quizResults) => {
              if (quizError) {
                console.error('Error fetching quiz data:', quizError);
                return res
                  .status(500)
                  .json({ error: 'Failed to fetch quiz data' });
              }

              if (quizResults.length === 0) {
                return res
                  .status(404)
                  .json({ error: 'No quizzes found for this video' });
              }

              const quizzes = quizResults.map((quiz) => ({
                quiz_id: quiz.quiz_id,
                question_text: quiz.question_text,
                options: quiz.options.options,
              }));

              res.json({
                video: {
                  title: video.title,
                  url: video.url,
                },
                quizzes: quizzes,
                nextVideoIndex: videoIndex + 1, // Provide the next video index
              });
            }
          );
        }
      );
    }
  );
});

// Endpoint to post progress
app.post('/api/postProgress', (req, res) => {
  const { uid, video_id, quiz_score } = req.body;
  const video_done = 1; // Assuming video is done
  const quiz_done = 1; // Assuming quiz is done

  // Validate input data
  if (!uid || !video_id || quiz_score === undefined) {
    return res.status(400).json({
      success: false,
      message: 'All fields (uid, video_id, quiz_score) are required',
    });
  }

  // Query to check if a progress record already exists
  const checkQuery =
    'SELECT COUNT(*) AS count FROM Progress WHERE uid = ? AND video_id = ?';
  connection.query(checkQuery, [uid, video_id], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking progress existence:', checkError);
      return res.status(500).json({
        success: false,
        message: 'Failed to check progress existence',
      });
    }

    const exists = checkResults[0].count > 0;

    let query;
    let values;

    if (exists) {
      // Update existing progress record
      query = `
        UPDATE Progress
        SET quiz_score = ?, video_done = ?, quiz_done = ?
        WHERE uid = ? AND video_id = ?
      `;
      values = [quiz_score, video_done, quiz_done, uid, video_id];
    } else {
      // Insert new progress record
      query = `
        INSERT INTO Progress (uid, video_id, quiz_score, video_done, quiz_done)
        VALUES (?, ?, ?, ?, ?)
      `;
      values = [uid, video_id, quiz_score, video_done, quiz_done];
    }

    // Execute the query
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting/updating data in MySQL:', err);
        return res
          .status(500)
          .json({ success: false, message: 'Failed to save progress' });
      }

      // Respond with success
      res.json({ success: true, message: 'Progress saved successfully' });
    });
  });
});

//Endpoint to fetch progress
app.get('/api/getProgress/:uid', (req, res) => {
  const { uid } = req.params;

  // Validate input data
  if (!uid) {
    return res.status(400).json({ success: false, message: 'UID is required' });
  }

  // Query to get the progress data for all videos for a given uid
  const query = `
    SELECT video_id, quiz_score, video_done, quiz_done
    FROM Progress
    WHERE uid = ?
  `;

  connection.query(query, [uid], (err, results) => {
    if (err) {
      console.error('Error fetching progress from MySQL:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Failed to fetch progress' });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No progress found for this user' });
    }

    // Send the progress data as the response
    const progressData = results.map((progress) => ({
      video_id: progress.video_id,
      quiz_score: progress.quiz_score,
      video_done: progress.video_done,
      quiz_done: progress.quiz_done,
    }));

    res.json({
      success: true,
      message: 'Progress fetched successfully',
      data: progressData,
    });
  });
});

// Endpoint to fetch total number of videos based on child's age group
app.get('/api/getTotalVideos', (req, res) => {
  const childUID = req.query.childUID;

  if (!childUID) {
    return res.status(400).json({ error: 'Child UID is required' });
  }

  connection.query(
    'SELECT age FROM Child WHERE uid = ?',
    [childUID],
    (error, childResults) => {
      if (error) {
        console.error('Error fetching child data:', error);
        return res.status(500).json({ error: 'Failed to fetch child data' });
      }

      if (childResults.length === 0) {
        return res.status(404).json({ error: 'Child not found' });
      }

      const childAge = childResults[0].age;
      let ageGroup = 1;

      if (childAge >= 3 && childAge <= 5) {
        ageGroup = 1;
      } else if (childAge >= 6 && childAge <= 8) {
        ageGroup = 2;
      } else if (childAge >= 9 && childAge <= 11) {
        ageGroup = 3;
      }

      // Fetch total number of videos for this age group
      connection.query(
        'SELECT COUNT(*) AS totalVideos FROM Video WHERE age_group = ?',
        [ageGroup],
        (countError, countResults) => {
          if (countError) {
            console.error('Error counting videos:', countError);
            return res.status(500).json({ error: 'Failed to count videos' });
          }

          res.json({
            success: true,
            totalVideos: countResults[0].totalVideos,
          });
        }
      );
    }
  );
});

app.post('/api/makeParentChild', (req, res) => {
  const { parent_uid, child_uid } = req.body;

  if (!parent_uid || !child_uid) {
    return res.status(400).json({
      success: false,
      message: 'Parent UID and Child UID are required',
    });
  }

  // Insert into parent_child table
  connection.query(
    'INSERT INTO parent_child (parent_uid, child_uid) VALUES (?, ?)',
    [parent_uid, child_uid],
    (error, results) => {
      if (error) {
        // Handle duplicate entry case or other MySQL errors
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            success: false,
            message: 'Parent-child relationship already exists',
          });
        }
        console.error('Error inserting into parent_child:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to insert parent-child relationship',
        });
      }
      res.json({
        success: true,
        message: 'Parent-child relationship created successfully',
      });
    }
  );
});


app.get('/getChildProgress', (req, res) => {
  const parentUID = req.query.parentUID;

  if (!parentUID) {
    return res.status(400).json({ message: "Parent UID is required" });
  }

  // Step 1: Query the Parent_Child table to get all child UIDs for the parent
  const childQuery = `SELECT child_uid FROM parent_child WHERE parent_uid = ?`;

  connection.query(childQuery, [parentUID], (error, childResults) => {
    if (error) {
      console.error('Error fetching children:', error);
      return res.status(500).json({ message: "Error fetching children" });
    }

    // Step 2: For each child_uid, get progress data from Progress table
    const childUids = childResults.map(child => child.child_uid);

    if (childUids.length === 0) {
      return res.json([]);  // No children found for this parent
    }

    // Create placeholders for the number of child UIDs
    const placeholders = childUids.map(() => '?').join(',');
    const progressQuery = `
      SELECT *
      FROM Progress 
      WHERE uid = (${placeholders})
    `;

    connection.query(progressQuery, childUids, (progressError, progressResults) => {
      if (progressError) {
        console.error('Error fetching progress:', progressError);
        return res.status(500).json({ message: "Error fetching progress" });
      }
      res.json(progressResults);
    });
  });
});

// Endpoint to get child name by UID
app.get('/api/getChildName/:uid', (req, res) => {
  const uid = req.params.uid;
  const query = 'SELECT first_name, last_name FROM Child WHERE uid = ?';

  connection.query(query, [uid], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: 'Database query error' });
      return;
    }

    if (results.length > 0) {
      const { first_name, last_name } = results[0];
      res.json({ success: true, first_name, last_name });
    } else {
      res.json({ success: false, message: 'No matching record found' });
    }
  });
});

app.get('/api/getVideoTitle/:id', (req, res) => { // Ensure endpoint name matches
  const id = req.params.id; // Changed 'uid' to 'id' to match parameter name
  const query = 'SELECT title FROM Video WHERE Video_id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: 'Database query error' });
      return;
    }

    if (results.length > 0) {
      const { title } = results[0];
      res.json({ success: true, title });
    } else {
      res.json({ success: false, message: 'No matching record found' });
    }
  });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
