# TrackPay back-end
## Installing for development
### Prerequisites
* Ubuntu 20.04 64 bits
* PostgreSQL >= v14
* git Client
* nodejs ^16
* npm

### Project configuration
Clone this repository to you local system and run the command below to install the project dependencies:

    npm install

After that, you should create a file called /*.env* in the root directory. We provide the file /*.env.example* as a template. It must be filled in correctly for the application to work. You can also ask your dev team for a filled in one.

### PostgreSQL configuration
After installing postgreSQL in your local system, you should create the trackpay user:

    sudo su - postgres
    psql -U postgres -c "CREATE ROLE trackpay SUPERUSER LOGIN PASSWORD 'trackpay'" -h localhost
    exit

After that, create the dev and test database:

    createdb --template=template0 -E UNICODE -O trackpay -U trackpay trackpay -h localhost
    
    createdb --template=template0 -E UNICODE -O trackpay -U trackpay trackpay-test -h localhost

Some migration scripts reference the function generate_uuid. Run the commands below to install it:

    psql -d trackpay -U trackpay -c 'CREATE EXTENSION "uuid-ossp"' -h localhost

    psql -d trackpay-test -U trackpay -c 'CREATE EXTENSION "uuid-ossp"' -h localhost

### DB migration/seed

Now you are ready to run the migration scripts in your /*development* environment. Note that this is not necessary when you are running a /*test* environment, as the seed is created automatically each time just before the E2E tests. In your project directory, run:

    npx sequelize db:migrate

### Firebase
This aplication uses FCM to send push notification across devices, and you should configure it properly before running the back-end. You will need a Firebase service account credential file, which you can download from the FCM Console. It's a json file that shoud NOT be added to the repository due to security reasons. After downloaded, it should be renamed to /*firebase-adminsdk.json* and put in the back-end root directory.

### Running the application
Just run:

    npm run dev-server

### Testing
We provide a Postman collection (and an environment sample) in the */postman* directory. You can use it to request the application.

E2E tests can be run by running both the server and the tests client.

In one terminal, run this first:

    npm run test-server

In another terminal, run this next:

    npm test