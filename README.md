## Database Setup and Usage Guide

### 1. Create and Use Database
To create and select the database for use, execute the following SQL commands:
>Create the database
```
    CREATE DATABASE cdcmsDatabase;
```
> Select the database for use
```
    USE cdcmsDatabase;
```

### 2. Table Creation
The following SQL commands will create two tables: `users` and `announcement`.
* **Creating the `users` table**
    * This table will store information about individuals, including personal details, family information, and health-related data.
```
    CREATE TABLE users (
    	id INT AUTO_INCREMENT PRIMARY KEY,
    	lName VARCHAR(100),
    	fName VARCHAR(100),
    	mName VARCHAR(100),
    	suffix VARCHAR(100),
    	bDay VARCHAR(100),
    	age VARCHAR(10),
    	sex VARCHAR(50),
    	healthHistory VARCHAR(100),
    	addressNumber VARCHAR(100),
    	brgy VARCHAR(100),
    	municipality VARCHAR(100),
    	fatherLName VARCHAR(100),
    	fatherFName VARCHAR(100),
    	fatherMName VARCHAR(100),
    	fatherContactNo VARCHAR(50),
    	motherLName VARCHAR(100),
    	motherFName VARCHAR(100),
    	motherMName VARCHAR(100),
    	motherContactNo VARCHAR(50),
    	guardianLName VARCHAR(100),
    	guardianFName VARCHAR(100),
    	guardianMName VARCHAR(100),
    	guardianContactNo VARCHAR(50),
    	guardianRelationship VARCHAR(100),
    	guardianEmail VARCHAR(100),
    	guardianOccupation VARCHAR(100),
    	schedule VARCHAR(100),
    	psa VARCHAR(200),
    	immunizationCard VARCHAR(200),
    	photo VARCHAR(200),
    	guardianQCID VARCHAR(200)
    );
```
* **Creating the `announcement` table**
    * This table will store announcements, including images, titles, dates, and descriptions.
```
    CREATE TABLE announcement (
    	id INT AUTO_INCREMENT PRIMARY KEY,
    	picture VARCHAR(200),
    	title VARCHAR(200),
    	dateAndTime VARCHAR(50),
    	description TEXT
    );
```

### 3. Additional Notes
* Ensure that the database and tables are created in the correct environment before inserting any data.
* The data types (e.g., `VARCHAR(100)`, `TEXT`) can be adjusted depending on the expected length and format of your data.
* You may also want to consider adding `NOT NULL` constraints or unique keys based on your specific use case.