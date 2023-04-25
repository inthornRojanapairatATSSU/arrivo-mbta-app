const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllRatings = require('./routes/ratingGetAllRatings')
const getAllComments = require('./routes/commentGetAllComments')
const addComment = require('./routes/commentCreateComment')
const editComment = require('./routes/commentEditComment')
const deleteComment = require('./routes/commentDeleteComment')
const getCommentByUsernameRoute = require('./routes/commentGetComment')
const deleteAllComments = require('./routes/commentDeleteAll')

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/rating', getAllRatings)
app.use('/comment', getAllComments)
app.use('/comment', addComment)
app.use('/comment', editComment)
app.use('/comment', deleteComment)
app.use('/comment', getCommentByUsernameRoute)
app.use('/comment', deleteAllComments)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
