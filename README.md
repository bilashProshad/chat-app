# MERN Chat App

This is a real-time chat application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The app incorporates email OTP (One-Time Password) verification for user registration and login, ensuring enhanced security and user authentication.

### Features

- **User authentication:** Users can create accounts and log in securely using their email addresses and OTPs sent to their registered email.
- **Email OTP verification:** During registration and login, users receive OTPs via email to verify their identity.
- **Real-time messaging:** Users can send and receive messages instantly in one-on-one and group chats.
- **Group chats:** Users can create and join different group chats to connect with specific groups of people.
- **Responsive design:** The app is fully responsive and works seamlessly on desktop and mobile devices.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bilashProshad/chat-app.git
```

2. Navigate to the project directory:

```bash
cd chat-app
```

3. Navigate to the server directory:

```bash
cd server
```

4. Install the server dependencies:

```bash
npm install
```

5. Navigate to the client directory:

```bash
cd ../client
```

6. Install the client dependencies:

```bash
npm install
```

### Configuration

1. Create a **`.env`** file in **server** directory and configure the following variables:

```js
PORT=4000
DB_URI=<MongoDB connection URI>
HASH_SECRET=<Secret key for Hash>
JWT_SECRET=<Secret key for JWT authentication>
JWT_EXPIRE=<Expiration time for JWT tokens>
COOKIE_EXPIRE=<Expiration time for Cookie>
SMPT_SERVICE=<SMTP server host for sending emails>
SMPT_MAIL=<Email address >
SMPT_APP_PASS=<SMTP app/email password>
CLOUDINARY_NAME=<Cloudinary name>
CLOUDINARY_API_KEY=<Cloudinary api key>
CLOUDINARY_SECRET=<Cloudinary secret>
FRONT_END_URL=http://localhost:3000
```

2. Create a **`.env.local`** file in **client** directory and configure the following variables:

```js
VITE_APP_SERVER=http://localhost:4000
```

### Usage

1. Navigate to **`client`** directory and start the frontend server:

```bash
npm run dev
```

2. Navigate to **`server`** directory and start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to http://localhost:3000
