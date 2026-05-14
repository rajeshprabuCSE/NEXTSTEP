require('dotenv').config();

const express = require('express');
const cors = require('cors');

const opportunityRoutes = require('./routes/opportunityRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());


// ROOT API
app.get('/', (req, res) => {
    res.json({
        message: 'NEXTSTEP Backend API Running'
    });
});


// OPPORTUNITY ROUTES
app.use('/api/opportunities', opportunityRoutes);


// ERROR HANDLER
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});