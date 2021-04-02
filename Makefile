.DEFAULT_GOAL := upall

COMPOSE=docker-compose
COMPOSE_BACK:=-f ./backend/docker-compose.yml
COMPOSE_FRONT:=-f ./frontend/docker-compose.yml

# help: Makefile targets description
# #

# target: help - Show commands.
help:
	@egrep "^#" [Mm]akefile | cut -d' ' -f3,4,5- | sed 's/^Usage:/\tUsage:/'

# target: build - Build all containers
build:
	$(COMPOSE) $(COMPOSE_BACK) build
	$(COMPOSE) $(COMPOSE_FRONT) build
	@echo "$@ build with success :|"

# target: upall - Up all containers (backend and frontend)
upall: upback upfront

# target: upback - Up backend container
upback:
	$(COMPOSE) $(COMPOSE_BACK) up -d
	@echo "$@ executed with success :)"

# target: upfront - Up frontend container
upfront:
	$(COMPOSE) $(COMPOSE_FRONT) up
	@echo "$@ finished :O"

# target: down - Down all containers
down:
	$(COMPOSE) $(COMPOSE_BACK) down
	$(COMPOSE) $(COMPOSE_FRONT) down
	@echo "$@ executed with success :|"

# target: seed - Execute seeder in mongodb
seed:
	$(COMPOSE) $(COMPOSE_BACK) exec api_webid npm run seed
