# NC News App API

**Author**: Francesco Vurchio  

The NC News app API is a backend service designed to programmatically access application data. Inspired by platforms like Reddit, it provides endpoints that enable interaction with the data used by the frontend application, mimicking real-world backend architecture.

---

## Hosted Versions

- **Backend (API)**: [NC News API](https://nc-news-bgp4.onrender.com)  
- **Frontend**: [NC News Frontend](https://munaciella.netlify.app/)  

---

## Repository Links

- **GitHub Repository**: [NC News frontend Repository](https://github.com/munaciella/munaciella_news_therevenge)  

---

## Getting Started

To contribute or set up the project locally, follow the steps below.

---

### 1. Fork This Repository

Create your own copy of this repository:  
1. Navigate to the [NC News API GitHub Repository](https://github.com/munaciella/NC-news).  
2. In the top-right corner, click **Fork**.  
3. Under "Owner," select your GitHub account or an organization you manage.  
4. Click **Create fork**.  

---

### 2. Clone Your Fork Locally

1. Navigate to your forked repository on GitHub.  
2. Click the **Code** button, then copy the HTTPS or SSH URL.  
3. Open your terminal.  
4. Change the directory to where you’d like to store the cloned repository:

```bash  
cd /your/desired/directory  
```
5.	Clone the repository using the following command:

```bash
git clone https://github.com/munaciella/NC-news.git
```
6.	Navigate into the cloned repository directory:

```bash
cd NC-news
```

---

### 3. Install Dependencies

After opening the repository in your code editor (e.g., VS Code):
1.	Open the terminal and run:

```bash
npm install
```

---

### 4. Add Environment Variables

Create the following environment files in the root directory:
1.	.env.test:

```bash
PGDATABASE=nc_news_test
```

2.	.env.development:

```bash
PGDATABASE=nc_news_development
```

---

### 5. Set Up and Seed the Database

To prepare the database:
1.	Run the following commands in your terminal:

```bash
npm run setup-dbs
npm run seed
```

---

### 6. Run Tests

Ensure the setup is correct by running the tests:
•	To run utility function tests:

```bash
npm run test utils.test.js
```

•	To test the app endpoints:

```bash
npm run test app.test.js
```

•	To run all test files:

```bash
npm run test
```

Development Dependencies

The following dev dependencies are used in this project:
	•	Husky: For managing Git hooks.
	•	Jest: For unit and integration testing.
	•	Jest-Extended: Additional matchers for Jest.
	•	Jest-Sorted: For array sorting tests in Jest.
	•	pg-format: A library for safely formatting SQL queries.
	•	Supertest: For HTTP assertions and endpoint testing.

Contribution Guidelines

If you’d like to contribute:

1.	Follow the steps above to fork, clone, and set up the project locally.

2.	Create a new branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

3.	Make your changes and commit them with a descriptive message:

```bash
git commit -m "Add a brief description of the changes"
```

4.	Push your changes to your fork:

```bash
git push origin feature-name
```

5.	Open a pull request from your branch to the main branch of this repository.