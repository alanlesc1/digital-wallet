# TrackPay back-end
## Installing for development
### Prerequisites
* Ubuntu 20.04 64 bits
* PostgreSQL >= v14
* git Client
* nodejs >= v12
* npm

### Project configuration
Clone this repository to you local system and run the command below to install the project dependencies:

    npm install

### PostgreSQL configuration
After installing postgreSQL in your local system, you should create the trackpay user:

    sudo su - postgres
    psql -U postgres -c "CREATE ROLE trackpay SUPERUSER LOGIN PASSWORD 'trackpay'" -h localhost
    exit

After that, create the database:

    createdb --template=template0 -E UNICODE -O trackpay -U trackpay trackpay -h localhost

Some migration scripts reference the function generate_uuid. Run the command below to install it:

    psql -d trackpay -U trackpay -c 'CREATE EXTENSION "uuid-ossp"' -h localhost

And now you are ready to run the migration scripts. In your project directory, run:

    sequelize db:migrate

### Running the application
Before running the application, you need to create your dotenv file. We provide a template in the file *.env.example*. It must be filled in correctly for the application to work.

After that, run:

    npm run dev

### Testing
We provide a Postman collection (and an environment sample) in the */postman* directory. You can use it to request the application.
