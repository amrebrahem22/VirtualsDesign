const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const commentsRoutes = require('./routes/comments');
const categoriesRoutes = require('./routes/categories');
const postsRoutes = require('./routes/posts');
const portfolioRoutes = require('./routes/portfolio');
const teamRoutes = require('./routes/team');
const jobsRoutes = require('./routes/jobs');
const servicesRoutes = require('./routes/services');
const mailRoutes = require('./routes/mail');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database Connected Successfully.'))
.catch(err => console.log(err))

// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/jobs', jobsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/mail', mailRoutes)


// handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
