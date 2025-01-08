NC News App API

Author: Francesco Vurchio

NC News app API is a backend service designed to programmatically access application data. Inspired by platforms like Reddit, it mimics a real-world backend architecture by providing endpoints to interact with the data used by the frontend application.

Hosted Versions
	•	Backend (API): NC News API
	•	Frontend: NC News Frontend

Repository Links
	•	API GitHub Repository: NC News API Repository

Getting Started

If you’d like to contribute or set up the project locally, follow the steps below.

1. Fork This Repository

To create your own copy of this repository:
	1.	Navigate to the NC News API GitHub Repository.
	2.	In the top-right corner of the page, click Fork.
	3.	Under “Owner,” select your GitHub account or an organization you manage.
	4.	Click Create fork.

2. Clone Your Fork Locally
	1.	Navigate to your forked repository on GitHub.
	2.	Click the Code button, then copy the HTTPS or SSH URL.
	3.	Open your terminal.
	4.	Change the directory to where you’d like to store the cloned repository:

cd /your/desired/directory


	5.	Clone the repository using the following command:

git clone <your-repository-url>


	6.	Navigate into the cloned repository directory:

cd nc-news

3. Install Dependencies

After opening the repository in your code editor (e.g., VS Code):
	1.	Open the terminal and run:

npm install

4. Add Environment Variables

Create the following environment files in the root directory:
	1.	.env.test:

PGDATABASE=nc_news_test


	2.	.env.development:

PGDATABASE=nc_news_development

5. Set Up and Seed the Database

To prepare the database:
	1.	Run the following commands in your terminal:

npm run setup-dbs
npm run seed

6. Run Tests

To ensure everything is working correctly, run the tests:
	•	To run utility function tests:

npm run test utils.test.js


	•	To test the app endpoints:

npm run test app.test.js


	•	To run all test files:

npm run test

Dev Dependencies

The following development dependencies are used in this project:
	•	Husky: For managing Git hooks.
	•	Jest: For unit and integration testing.
	•	Jest-Extended: Provides additional matchers for Jest.
	•	Jest-Sorted: Adds functionality to test array sorting in Jest.
	•	pg-format: A library for safely formatting SQL queries.
	•	Supertest: For HTTP assertions and endpoint testing.

Contribution Guidelines

If you wish to contribute:
	1.	Follow the steps above to fork, clone, and set up the project locally.
	2.	Create a new branch for your feature or bug fix:

git checkout -b feature-name


	3.	Make your changes and commit them with a descriptive message:

git commit -m "Add a brief description of the changes"


	4.	Push your changes to your fork:

git push origin feature-name


	5.	Open a pull request from your branch to the main branch of this repository.

License

This project is open-source and available under the MIT License.