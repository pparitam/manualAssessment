# Interview Assessment README

## Overview
This repository contains all the necessary files and instructions to perform the interview assessment. The assessment includes:

1. A Google Spreadsheet with the relevant data.
2. Automated tests using the Cypress framework.
3. Performance testing using the K6 tool.

## Google Spreadsheet
The Google Spreadsheet contains the data required for the assessment. You can access it using the following link:

Google Spreadsheet Link: [Manual testcase](https://docs.google.com/spreadsheets/d/144E5LvQNEi-moya-Ma7frRpRZzCGMkmcMGNiqf5lGXw/edit#gid=963947777)

## Cypress Framework
Cypress is an end-to-end testing framework that is used to write automated tests for web applications.

### Prerequisites
- Node.js (>=20.0.0)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```sh
   git clone [https://github.com/your-repository.git](https://github.com/pparitam/manualAssessment.git)
   ```
2. Navigate to the project directory:
   ```sh
   cd manualAssessment
   ```
3. Install the dependencies:
   ```sh
   npm install 
   ```

### Running Cypress Tests
1. Open the Cypress Test Runner:
   ```sh
   npm run cypress:open
   ```
   This will open the Cypress Test Runner, where you can select and run the tests interactively.

2. Run Cypress tests in headless mode:
   ```sh
   npm run cypress:run
   ```
   This will run all the tests in the terminal without opening the Cypress Test Runner.

## K6 Performance Testing
K6 is a performance testing tool for testing the load on web applications.

### Prerequisites
- K6

### Installation
1. Install K6:
   ```sh
   brew install k6   # For macOS users
   ```
   ```sh
   choco install k6  # For Windows users
   ```
   Alternatively, you can download the appropriate version from the [K6 website](https://k6.io/docs/getting-started/installation/) for your operating system.

### Running K6 Tests
 Run the K6 test script:
   ```sh
   npm run k6:run
   ```
### Running Cypress and K6 Tests
   ```sh
   npm run test:performance
   ```
## Directory Structure
```
manualAssessment
├── .github/workflows
│   └── ci.yml
├── cypress
├── e2e
│   └── ProductPurchase.cy.js
│   ├── fixtures
│   ├── POM
│   ├── reports/html
│   └── support
├── load-test
│   └── load-test.js
├── LoadTest.html
├── package.json
├── package-lock.json
└── README.md

```

## Conclusion
By following the steps outlined in this README, you should be able to set up and run the Cypress and K6 tests successfully. If you encounter any issues or have any questions, please reach out to the repository maintainer.

