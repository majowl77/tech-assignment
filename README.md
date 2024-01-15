# Posts Web App

A web page that presents posts in a tabular format using the JSONPlaceholder API.\
This project is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## Introduction

This project is a web page that displays posts in a tabular format. Users can interact with the table by paginating through the records, sorting each column, and selecting a specific user to view their posts.Furthermore, users have the ability to click on individual posts to access detailed information, enhancing the overall exploration of the displayed content.

## Features

- **Retrieving Posts:**

  - Utilize the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API to fetch a list of posts.

- **Display Tabular Format:**

  - Present posts in a clear tabular format.

- **Tabular View Columns:**

  - Create a tabular view with columns: User Id, Title, and Body.

- **Frontend Pagination:**

  - Implement frontend pagination, allowing users to choose between 5, 10, 15, 20, or 25 records per page.

- **Column Sorting:**

  - Enable sorting of table columns in both ascending and descending order.

- **Select Specific User:**

  - Provide users with the ability to select a specific user, retrieving and displaying all the posts for the chosen user.

- **Detailed Post Information:**
  - Explore detailed information for each post by initiating an API call to `https://jsonplaceholder.typicode.com/posts/{userId}`.

## Installation

1. Clone the repository.
2. Run `npm install` or `yarn install` to install dependencies.
3. Start the development server with `npm start` or `yarn start`.

## How to Contribute

If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

![Build Status](https://travis-ci.org/majowl77/tech-assignment.svg?branch=main)

## Created by

[Majedah Matar](https://github.com/majowl77).
