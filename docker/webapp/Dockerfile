FROM debian:jessie

############################# INSTALL GIT #############################

RUN apt-get update && apt-get install -y ca-certificates git-core ssh
RUN apt-get install -y sudo

# Make ssh dir
RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
ADD .ssh/id_rsa /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts

# Add github.com key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

############################# INSTALL NODE AND NPM #############################

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y nodejs

############################# INSTALL APP DEPENDENCIES  #############################

WORKDIR /opt
RUN echo "cache 4" && git clone https://github.com/muskacirca/lrds-stock-manager.git

WORKDIR /opt/lrds-stock-manager
RUN npm install lodash
RUN npm install -g db-migrate
RUN npm install -g db-migrate-mysql
RUN npm install

# Bundle app source
COPY . /opt/lrds-stock-manager

EXPOSE 8080

WORKDIR /opt/lrds-stock-manager
CMD db-migrate up --config database.json -e docker && npm start
