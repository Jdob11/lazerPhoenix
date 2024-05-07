# Lazer Phoenix

## Description

Lazer Phoenix is a single-page application designed for ordering food for pick up. It was created as a midterm assignment for the Lighthouse Labs flex program for full-stack web development. The application utilizes Express.js for the server-side logic and jQuery for dynamic client-side rendering. It also integrates the Twilio API to facilitate communication between the restaurant owner and the customer regarding the progress of their order.

## Project Information

This project was developed as part of the curriculum at Lighthouse Labs. It represents an educational exercise and may contain specific requirements or constraints imposed by the course instructors.

## Note to Contributors

If you're considering contributing to this project or using it as a reference, please be aware that it was created for educational purposes and may not adhere to all industry standards or best practices. While contributions and feedback are welcome, please keep in mind the context in which this project was developed.

## Technologies Used

- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **jQuery:** A fast, small, and feature-rich JavaScript library for simplifying client-side scripting.
- **Twilio API:** A cloud communications platform for building SMS, Voice & Messaging applications.
- **AJAX: Asynchronous JavaScript and XML (AJAX)** is a technique used on the client-side to create asynchronous web applications. It allows you to make requests to the server without reloading the entire page, which is commonly used in single-page applications like yours for dynamic content loading.
- **SCSS: SCSS (Sassy CSS)** is a superset of CSS, meaning it adds additional functionality such as variables, nesting, and mixins to traditional CSS syntax. SCSS is often used in web development to help organize and modularize stylesheets, making them easier to maintain and scale.

## Installation

To run the Lazer Phoenix project locally, follow these steps:

1. Clone the [repository](https://github.com/Jdob11/lazerPhoenix):
```bash
   git clone https://github.com/Jdob11/lazerPhoenix
   ```

2. Navigate to the project directory:

```bash
  cd tweeter
```

3. Install dependencies:
```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Twilio credentials and any other necessary environment variables to the `.env` file.

5. a) To start the server, run:

```
npm run start
```

5. b) To run the server with automatic restart on file changes (using nodemon), run:

```
npm run local
```

## Usage

Once the server is running, you can access the Lazer Phoenix application by navigating to:
-  `http://localhost:8080/users/1` for the Owner interface  

  ### or 
- `http://localhost:8080/users/2` for the user interface  

From there, you can interact with the interface to place food orders for pick up as the customer, or edit and add food items, as well as see current orders and send estimated and completed times as a restaurant owner.

## Dependencies
- [chalk](https://www.npmjs.com/package/chalk): Terminal string styling done right
- [cookie-session](https://www.npmjs.com/package/cookie-session): Simple cookie-based session middleware
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`
- [ejs](https://www.npmjs.com/package/ejs): Embedded JavaScript templates for building dynamic web pages
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for Node.js
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js
- [sass](https://www.npmjs.com/package/sass): A pure JavaScript implementation of Sass
- [twilio](https://www.npmjs.com/package/twilio): Twilio API client

## Dev Dependencies
- [nodemon](https://www.npmjs.com/package/nodemon): Utility that monitors for changes in your source code and automatically restarts your server


## Contributors

- Jeff Dobson (https://github.com/Jdob11)
- Brett Gelinas (https://github.com/brettg17)
- Ryan Huynh (https://github.com/rhuynh17)

## Acknowledgments

This project includes code provided by [Lighthouse Labs](https://www.lighthouselabs.ca/).

## License

This project is licensed under the [ISC License](LICENSE).
