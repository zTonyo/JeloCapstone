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
The following SQL commands will create tables for the CDCMS Database.
```
		-- Table: user_credential
	CREATE TABLE user_credential (
		user_id INT PRIMARY KEY AUTO_INCREMENT,
		email VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL,
		user_role ENUM('teacher', 'staff', 'volunteer', 'guardian') NOT NULL,
		isActive BOOLEAN DEFAULT FALSE,
		confirmationToken VARCHAR(255)
	);

	-- Table: guardian_credential
	CREATE TABLE guardian_credential (
		id INT PRIMARY KEY AUTO_INCREMENT,
		email VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL
	);

	-- Table: guardian
	CREATE TABLE guardian (
		guardianID INT PRIMARY KEY AUTO_INCREMENT,
		id INT NOT NULL,
		fullname VARCHAR(255) NOT NULL,
		birthday DATETIME NOT NULL,
		age INT NOT NULL,
		gender VARCHAR(10) NOT NULL,
		address VARCHAR(255) NOT NULL,
		FOREIGN KEY (id) REFERENCES guardian_credential(id) ON DELETE CASCADE
	);

	-- Table: student
	CREATE TABLE student (
		studentKey INT PRIMARY KEY AUTO_INCREMENT,
		studentID INT NOT NULL UNIQUE,
		user_id INT NOT NULL,
		guardianID INT NOT NULL,
		firstName VARCHAR(100) NOT NULL,
		middleName VARCHAR(100),
		lastName VARCHAR(100) NOT NULL,
		suffix VARCHAR(10),
		birthdate DATE NOT NULL,
		age INT NOT NULL,
		sex VARCHAR(10) NOT NULL,
		healthHistory TEXT,
		FOREIGN KEY (user_id) REFERENCES user_credential(user_id) ON DELETE CASCADE,
		FOREIGN KEY (guardianID) REFERENCES guardian(guardianID) ON DELETE CASCADE
	);

	-- Table: student_address
	CREATE TABLE student_address (
		id INT PRIMARY KEY AUTO_INCREMENT,
		studentKey INT NOT NULL,
		address_no INT NOT NULL,
		baranggay VARCHAR(100) NOT NULL,
		municipality VARCHAR(100) NOT NULL,
		FOREIGN KEY (studentKey) REFERENCES student(studentKey) ON DELETE CASCADE
	);

	-- Table: father_info
	CREATE TABLE father_info (
		id INT PRIMARY KEY AUTO_INCREMENT,
		studentKey INT NOT NULL,
		firstName VARCHAR(100) NOT NULL,
		middleName VARCHAR(100),
		lastName VARCHAR(100) NOT NULL,
		contact_number VARCHAR(15) NOT NULL,
		FOREIGN KEY (studentKey) REFERENCES student(studentKey) ON DELETE CASCADE
	);

	-- Table: mother_info
	CREATE TABLE mother_info (
		id INT PRIMARY KEY AUTO_INCREMENT,
		studentKey INT NOT NULL,
		firstName VARCHAR(100) NOT NULL,
		middleName VARCHAR(100),
		lastName VARCHAR(100) NOT NULL,
		contact_number VARCHAR(15) NOT NULL,
		FOREIGN KEY (studentKey) REFERENCES student(studentKey) ON DELETE CASCADE
	);

	-- Table: guardian_info
	CREATE TABLE guardian_info (
		id INT PRIMARY KEY AUTO_INCREMENT,
		studentKey INT NOT NULL,
		firstName VARCHAR(100) NOT NULL,
		middleName VARCHAR(100),
		lastName VARCHAR(100) NOT NULL,
		contact_number VARCHAR(15) NOT NULL,
		FOREIGN KEY (studentKey) REFERENCES student(studentKey) ON DELETE CASCADE
	);

	-- Table: enrollment
	CREATE TABLE enrollment (
		id INT PRIMARY KEY,
		studentID INT NOT NULL,
		schedule DATETIME NOT NULL,
		psa VARCHAR(255) NOT NULL,
		immunizationCard VARCHAR(255) NOT NULL,
		recentPhoto VARCHAR(255) NOT NULL,
		guardianQCID VARCHAR(255) NOT NULL,
		FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE
	);

	-- Table: user_info
	CREATE TABLE user_info (
		id INT PRIMARY KEY AUTO_INCREMENT,
		user_id INT NOT NULL,
		fullname VARCHAR(255) NOT NULL,
		birthday DATETIME DEFAULT NULL,
		age INT DEFAULT NULL,
		gender VARCHAR(10) DEFAULT NULL,
		address VARCHAR(255) DEFAULT NULL,
		FOREIGN KEY (user_id) REFERENCES user_credential(user_id) ON DELETE CASCADE
	);

	-- Table: announcement
	CREATE TABLE announcement (
		id INT PRIMARY KEY AUTO_INCREMENT,
		user_id INT NOT NULL,
		picture VARCHAR(255),
		title VARCHAR(255),
		upload_date DATETIME NOT NULL,
		description TEXT NOT NULL,
		FOREIGN KEY (user_id) REFERENCES user_credential(user_id) ON DELETE CASCADE
	);

	-- Table: attendance
	CREATE TABLE attendance (
		id INT PRIMARY KEY AUTO_INCREMENT,
		studentID INT NOT NULL,
		status VARCHAR(50) NOT NULL,
		FOREIGN KEY (studentID) REFERENCES student(studentID) ON DELETE CASCADE
	);
```
### 2. Additional Notes
* Ensure that the database and tables are created in the correct environment before inserting any data.
* The data types (e.g., `VARCHAR(100)`, `TEXT`) can be adjusted depending on the expected length and format of your data.
* You may also want to consider adding `NOT NULL` constraints or unique keys based on your specific use case.