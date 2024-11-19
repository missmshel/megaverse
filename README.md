# 🌌 Megaverse Coding Challenge

Welcome to the **Megaverse Coding Challenge** repository! This project is part of a full-stack engineering coding challenge aimed at creating a 2D "megaverse" filled with different astral objects, including 🪐 Polyanets, 🌙 Soloons, and ☄️ Comeths.

The goal is to interact with the Megaverse API to create various celestial patterns as per given objectives, demonstrating proficiency in software design, code quality, error handling, and API interaction.

## 🚀 Project Overview

The project is split into two main phases:

1. **Phase 1**: Create a "Polyanet Cross" by interacting with the Megaverse API.
2. **Phase 2**: Build a complex megaverse filled with **Polyanets**, **Soloons** of various colors, and **Comeths** with directions to form a pattern representing the Crossmint logo.

The solution is automated and utilizes an OOP approach to encapsulate the different types of celestial objects, while a grid system coordinates the creation of these entities through a series of API calls.

## 📁 Directory Structure

megaverse-challenge/
│
├── src/
│   ├── classes/
│   │   ├── AstralObject.js
│   │   ├── Polyanet.js
│   │   ├── Soloon.js
│   │   ├── Cometh.js
│   │
│   ├── services/
│   │   └── MegaverseAPI.js
│   │
│   ├── Grid.js
│   ├── main.js
│
├── tests/
│   ├── Cometh.test.js
│   ├── Grid.test.js
│   ├── main.test.js
│   ├── MegaverseAPI.test.js
│   ├── Polyanet.test.js
│   ├── Soloon.test.js
│
├── .env
├── .gitignore
├── jest.config.js
└── package.json


## 🛠️ Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Jest for testing
- **Dependencies**:
  - **axios**: For HTTP requests to the Megaverse API
  - **dotenv**: To manage environment variables
  - **Jest**: To write and run unit tests

## 💾 Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/megaverse-coding-challenge.git
    cd megaverse-coding-challenge
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following details:
    ```
    CANDIDATE_ID=your-candidate-id
    MEGA_URL=https://challenge.crossmint.io/api/
    NODE_ENV=development
    ```

4. **Run the Application in Dev Mode**:
    To start the application and interact with the Megaverse API in developer mode:
    ```bash
    npm run dev
    ```

5. **Test the Application**:
    To run tests:
    ```bash
    npm test
    ```

## 📝 Usage

This project has two primary modes of operation:

- **Development Mode**: In development mode (`NODE_ENV=development`), the API interactions are simulated to prevent unnecessary API requests during testing.
- **Production Mode**: In production, the program will make actual requests to the Megaverse API to create the celestial objects.

To **execute the main process**, use the following command:
```bash
npm start
```

# 📚 Code Overview

1. Classes:
   - **AstralObject**: A base class that represents any generic astral object. Polyanet, Soloon, and Cometh extend this class to add specific properties.
   - **Polyanet**, **Soloon**, **Cometh**: Each has a **create()** and **delete()** method that calls MegaverseAPI to interact with the Megaverse API. The Soloon and Cometh classes also have specific validations for colors and directions respectively.

2. Grid:
The Grid.js file manages the creation of the entire megaverse grid based on the **goal map** provided by the API. It breaks down the entities to be created and processes them in manageable batches, which is essential for avoiding rate limits on the API.

3. MegaverseAPI:
The MegaverseAPI class is responsible for all HTTP requests to the Megaverse API, with **reusable methods** (postShape, deleteShape) for creating and deleting different types of entities. It also includes robust error handling, including retries for rate-limit errors.

4. Batch Processing:
To avoid hitting API rate limits, batch processing is used to create entities. This strategy ensures requests are throttled and batched appropriately with slight delays between each batch.

5. Testing:
   - Unit Tests: Written with Jest for individual modules (Grid, MegaverseAPI, and shape classes).
   - Tests Included:
        API calls (mocked with Jest).
        Creation of Polyanet, Soloon, Cometh with correct data.
        Error handling for invalid data (e.g., invalid color for Soloon or direction for Cometh).

6. Error Handling:
The solution includes robust error handling:

    400 Errors: Handle bad requests and log errors for malformed data.
    429 Errors: Retry requests after a delay if the rate limit is exceeded.
    Other Errors: General error handling to ensure the program doesn't crash unexpectedly.


# 🔍 Design Choices
    - Object-Oriented Programming (OOP): The problem was modeled using OOP to encapsulate the properties and behavior of each astral object (Polyanet, Soloon, Cometh). This makes the code extendable for future additions.

    - Reusable API Calls: Instead of creating separate API methods for each entity, a single postShape() and deleteShape() function handle requests for all entities, reducing redundancy.

    - Batch Processing for Rate Limits: Given the API's rate limitations, batch processing was used to throttle the number of requests, reducing the risk of being blocked.

# 🔧 Improvements and Future Extensions
    - Automated Error Recovery: Implementing a more sophisticated retry mechanism for non-deterministic failures could enhance resilience.
    - UI Integration: Building a web interface to visualize the megaverse.
    - Dynamic Map Parsing: Add functionality to dynamically detect changes in the goal map and adjust accordingly, minimizing unnecessary API calls.

# 🧪 Testing Strategy
    - Unit Testing: Unit tests were implemented using Jest for all main functionalities, including:
        API Interactions (MegaverseAPI)
        Entity Creation and Validation (Polyanet, Soloon, Cometh)
        Grid System for creating the entire map.
    - End-to-End Testing: Could be implemented using a tool like Cypress for future iterations to simulate the entire creation process end-to-end.

# 🤝 Contributing
This repository is part of a coding challenge and is currently not open for public contributions.

# 📜 License
This project is licensed under the MIT License.

# 📧 Contact
For any questions or concerns, feel free to contact me at amichelleconroy@gmail.com.