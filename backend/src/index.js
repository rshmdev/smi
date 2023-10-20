import express from 'express'
import router from './routes.js';
import cors from 'cors'
const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())

app.use(express.json());
app.use('/v1', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});