
# Genealogy Database API

This project is a simple **Genealogy Database** API built with **FastAPI** and **PostgreSQL**. It provides endpoints to manage family data, person records, events, and relationships. The project aims to offer an API interface for storing and querying genealogy-related information.

## Features

- **Family Management**: Create and retrieve family records.
- **Person Management**: Create and retrieve person records with family associations.
- **Event Management**: Store and retrieve events related to persons and families.
- **Relationship Management**: Store and manage relationships between persons (e.g., siblings, spouses).

## Technologies Used

- **FastAPI**: A modern web framework for building APIs with Python.
- **PostgreSQL**: A powerful, open-source relational database.
- **psycopg2**: PostgreSQL database adapter for Python.
- **Uvicorn**: ASGI server for FastAPI.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Python 3.7+**
- **PostgreSQL**: You can download and install it from [PostgreSQL Downloads](https://www.postgresql.org/download/).
- **pip**: Python package manager.

### Steps to Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kiyotone/DBMS-backend.git
   cd DBMS-backend
   ```

2. **Create a virtual environment** (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use: venv\Scripts\activate
   ```

3. **Install the required dependencies**:

   Install the necessary packages via pip:

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the PostgreSQL database**:

   - Make sure your PostgreSQL server is running.
   - Create a database for the project:

     ```bash
     psql -U [username]
     CREATE DATABASE [database];
     GRANT ALL PRIVILEGES ON DATABASE [database] TO [username]; 
     ``` 
   - Set up the database credentials in your `.env` or configuration file (you can also use the following as an example):

     ```ini
     DATABASE_URL=postgresql://[username]:[password]@localhost:5432/[database]
     ```

   Replace `username` and `password` with your PostgreSQL credentials.

5. **Run the application**:

   After all dependencies are installed and the database is set up, run the FastAPI application:

   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be accessible at `http://127.0.0.1:8000`.

6. **Testing the API**:

   - Visit `http://127.0.0.1:8000/docs` to see the auto-generated documentation provided by FastAPI. From there, you can test the endpoints and interact with the API.

7. **Loading the Data**:

   ```bash
   pg_restore -U [username] -d [database_name] /path/to/genealogy_backup.dump
    ```
