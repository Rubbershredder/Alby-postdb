Here's an updated `README.md` based on the specific packages you've used:

---

# Ably PostgreSQL Event Logger

This Node.js application connects to Ably's real-time messaging service and logs events to a PostgreSQL database. It listens to specific Ably channels, captures events, and stores them in a PostgreSQL table.

## Features
- Subscribe to Ably channels.
- Log real-time events to PostgreSQL.
- Graceful shutdown of connections.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed.
- A PostgreSQL database setup.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rubbershredder/Alby-postdb.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Alby-postdb
   ```

3. Install the dependencies:
   ```bash
   npm install pg ably dotenv
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   ABLY_API_KEY=your-ably-api-key
   PG_USER=your-postgres-username
   PG_PASSWORD=your-postgres-password
   PG_HOST=your-postgres-host
   PG_PORT=your-postgres-port
   PG_DATABASE=your-postgres-database-name
   ```

5. Ensure you have a PostgreSQL table set up for logging events:
   ```sql
   CREATE TABLE ably_logs (
     id SERIAL PRIMARY KEY,
     channel VARCHAR(255),
     event_name VARCHAR(255),
     event_data JSON,
     client_id VARCHAR(255),
     timestamp TIMESTAMPTZ DEFAULT NOW()
   );
   ```

## Usage

1. Start the application:
   ```bash
   node app.js
   ```

2. The app will subscribe to an Ably channel (by default, `test-channel`) and log any incoming messages to the PostgreSQL database.

## Example

To subscribe to a different channel, modify the `subscribeToChannel` function in `app.js`:
```javascript
subscribeToChannel("your-channel-name");
```

## Packages Used

- [pg](https://www.npmjs.com/package/pg) - PostgreSQL client for Node.js.
- [ably](https://www.npmjs.com/package/ably) - A real-time messaging service.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file into `process.env`.

## License

This project is licensed under the MIT License.

---

Feel free to adjust the repository name and other details as needed!
