import 'dotenv/config'; // Load environment variables from .env file
import app from './app.js'; // Import the app instance

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Book Store app is listening on port ${PORT}.`);
});
