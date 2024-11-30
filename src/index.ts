import { createExpressServer } from './config/serverExpress';
import dotenv from 'dotenv';

dotenv.config();

const app = createExpressServer();

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    console.log(`run on ${PORT}`);
    console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
