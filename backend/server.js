import 'dotenv/config';
import app from './app.js';

console.log('Clerk Publishable Key:', process.env.CLERK_PUBLISHABLE_KEY);
console.log('Clerk Secret Key:', process.env.CLERK_SECRET_KEY);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Book Store app is listening on port ${PORT}.`);
});




