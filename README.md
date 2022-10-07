# TrackPay back-end
## Installing for development
### Prerequisites
* Ubuntu 20.04 64 bits
* PostgreSQL >= v14
* git Client
* nodejs >= v16
* npm

### Project configuration
Clone this repository to you local system and run the command below to install the project dependencies:

    npm install

After that, you should create a file called ".env" in the root directory. We provide the file ".env.example" as a template. It must be filled in correctly for the application to work. You can also ask your dev team for a filled in one.

### PostgreSQL configuration
After installing postgreSQL in your local system, you should create the trackpay user:

    sudo su - postgres
    psql -U postgres -c "CREATE ROLE trackpay SUPERUSER LOGIN PASSWORD 'trackpay'" -h localhost
    exit

After that, create the database:

    createdb --template=template0 -E UNICODE -O trackpay -U trackpay trackpay -h localhost

Some migration scripts reference the function generate_uuid. Run the command below to install it:

    psql -d trackpay -U trackpay -c 'CREATE EXTENSION "uuid-ossp"' -h localhost

### DB migration/seed

Now you are ready to run the migration scripts. In your project directory, run:

    sequelize db:migrate

### Running the application
Just run:

    npm run dev

### Testing
We provide a Postman collection (and an environment sample) in the */postman* directory. You can use it to request the application.
