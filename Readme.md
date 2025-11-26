# Candidate API Backend

## Overview
This is a simple Node.js Express backend API that serves candidate data from a MySQL database.

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server

## Setup

1. Clone the repository and navigate into it.

2. Copy `.env.example` to `.env` and configure your MySQL credentials and server port.

3. Create the database and candidates table in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS interview_db;
USE interview_db;

CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status VARCHAR(100) NOT NULL
);