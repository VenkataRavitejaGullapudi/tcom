# tcom
 A microservice app that provides apis to perform some basic company related operations.
- APIs are live at [https://tcom-node-api.herokuapp.com/](https://tcom-node-api.herokuapp.com/)

- Postman Collection JSON Link
[https://www.getpostman.com/collections/670b124549fcf9f062f4](https://www.getpostman.com/collections/670b124549fcf9f062f4)

### Local Setup
0. Make sure that you have Node in your system. If not please install the Node first.
1. Install all the required dependencies
    <!-- - `npm install -g typescript` to install typescript globally in your system
    - Check for successful installation of the typescript compiler by using version command
    `tsc --version` -->
    - Run `npm install` to install all the dependencies mentioned in the project(package.json)
2. Create a .env file in the root folder. And Add the following variables in the .env:
    a. PORT= PORT to run the application
    b. API_SECRET= SECRET Key to sign and validate JWT tokens
    c. MONGODB_URL = For connecting to db. Ref point 3
    - Also check for the .env.sample for your reference
3. For Database Connection (MONGO DB),
    1. If you want to connect with the local mongodb, 
        - Install mongodb in your system.
        - And in the MONGODB_URL env variable oof .env file give the local db url similar to `mongodb://localhost:27017/techwondoe`
    2. If you want to connect with the remote mongodb (eg: mongo db atlas)
        - Get the connection string or url from the mongodb remote site (`mongodb+srv://{Username}:{Password}@{HOST}/{DB_NAME}`)and assign to the MONGODB_URL env variable
4. Run the server in the Development mode using the below command
    `npm run dev`
5. Run the server in the Production mode using the below command
    `npm start`

### Importing Postman Collection JSON Link
    - https://www.getpostman.com/collections/670b124549fcf9f062f4
    - Copy this link and go to postman
    - Click on File > Import
    - Go to Link Tab in the import pop up
    - Paste the link and Continue
    
- This APP's Functional Requirements are as below
![image](https://user-images.githubusercontent.com/70102577/148520237-25391619-574b-40f6-84be-a95591889300.png)


### Hitting APIs
- First hit the token API to get the token
- And then using those token either in the authorization header or in the cookie will give the access to hit the apis.
- Endpoints Available
    0. {{HOST}}/api/v1/token   **GET**
    1. {{HOST}}/api/v1/company    **POST**
    2. {{HOST}}/api/v1/company/COMPANYUUID   **GET**
    3. {{HOST}}/api/v1/company/search?company_name=NAME   **GET**
    4. {{HOST}}/api/v1/team/COMPANYUUID   **POST**
    5. {{HOST}}/api/v1/allteams   **GET**
    
