# Welcome Sechard Contacts APP

Just download code and write ```npm install``` or ```yarn```.

Create ```config.js``` file in main directory (near app.js) and add your firebase config in it

Example:

```
export const firebaseConfig = {
    apiKey: "your-key",
    authDomain: "sechard-frontend.firebaseapp.com",
    projectId: "sechard-frontend",
    storageBucket: "sechard-frontend.appspot.com",
    messagingSenderId: "your-id",
    appId: "your-id",
    measurementId: "your-id"
  };
```

Then write ```yarn web``` ```expo start --web``` on terminal.
