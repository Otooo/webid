# Web Bid Program [![project][project]]() ![version][version-badge]

## Requirements  
  1. Make sure you have the [docker](https://www.docker.com/products/docker-desktop) installed on the machine.
  2. Make sure you have git installed on the machine.
  
### Utility to run **Makefile** (Not required)
  1. ***Windows***: [Cygwin](https://www.cygwin.com) or [MinGW](http://www.mingw.org).
  2. ***Linux***: GNU toolchain (default in Linux machines).


## Install
Follow the next steps ([using the makefile](#using-makefile) or [docker-compose](#using-docker-compose)):

#### Using **Make**file:  
  1. Clone the project in your local machine.
  2. Type `cd backend && cp .env-example .env && cd ..` in project root.
  3. Type `cd frontend && cp .env-example .env && cd ..` in project root.
  4. Type `make build` in project root. It will build the containers.
  5. Type `make` in project root. It will run the containers in _daemon_ mode.
  6. Type `make seed` in project root. It will configure the initials data in mongodb.
  7. The application will be running on **[http://localhost:8080](http://localhost:8080)**.
  8. The api will be running on **[http://localhost:9000/api](http://localhost:9000/api)**.
   
#### Using **docker-compose**:  
  1. Clone the project in your local machine.
  2. Type `cd backend && cp .env-example .env && cd ..` in project root.
  2. Type `cd frontend && cp .env-example .env && cd ..` in project root.
  3. Type ``docker-compose -f ./backend/docker-compose.yml up -d; docker-compose -f ./frontend/docker-compose.yml up -d`` in project root. It will build the containers and will run the containers in _daemon_ mode.
  4. Type `docker-compose -f ./backend/docker-compose.yml exec api_webid node ...` in project root. It will configure the initials data in mongodb.
  5. The application will be running on **[http://localhost:8080](http://localhost:8080)**.
  6. The api will be running on **[http://localhost:9000/api](http://localhost:9000/api)**.


## Usage
  1. After seeding, you can enter the [WeBid](http://localhost:8080) with these credentials:  
    `name: `**admin**  
    `password:` **admin**  
    or  
    `name:` **user1**  
    `password:` **user1**  
    or  
    `name:` **user2**  
    `password:` **user2**  

## Common commands list

  * List makefile commands. See [Makefile][MAKEFILE].  
    `make help`  
  * Up all containers related to backend and frontend.  
    `make`  
    or  
    `docker-compose -f ./backend/docker-compose.yml up -d; docker-compose -f ./frontend/docker-compose.yml up -d`  
  * Down all containers.  
    `make down`  
    or  
    `docker-compose -f ./backend/docker-compose.yml down; docker-compose -f ./frontend/docker-compose.yml down`  
  * Up containerrs related to backend.  
    `make upback`  
    or  
    `docker-compose -f ./backend/docker-compose.yml down`  
  * Up containerrs related to frontend.  
    `make upfront`  
    or  
    `docker-compose -f ./frontend/docker-compose.yml down`  
  * Run seed of mongodb.  
    `make seed`  
    or  
    `docker-compose -f ./backend/docker-compose.yml exec api_webid npm run seed`  


[MAKEFILE]: ./Makefile
[project]: https://img.shields.io/badge/webid-tomato.svg
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
