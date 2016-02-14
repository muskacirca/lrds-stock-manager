CREATE TABLE IF NOT EXISTS domains (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  reference varchar(100) NOT NULL,
  description varchar(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_Login (name)
);

CREATE TABLE IF NOT EXISTS categories (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  reference varchar(100) NOT NULL,
  description varchar(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_Login (name)
);

CREATE TABLE IF NOT EXISTS items (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  reference varchar(100) NOT NULL,
  description varchar(255) NOT NULL,
  domainId BIGINT(20) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_Login (name)
);

CREATE TABLE IF NOT EXISTS comments_items (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  itemId BIGINT(20) NOT NULL,
  text varchar(255) NOT NULL,
  creationDate datetime NOT NULL,
  updateDate datetime NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE comments_items
ADD CONSTRAINT FK_items_comments FOREIGN KEY (itemId) REFERENCES items (id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS linkedItems (
  itemId BIGINT(20) NOT NULL,
  linkedItemId BIGINT(20) NOT NULL,
  isRequired BOOLEAN NOT NULL,
  PRIMARY KEY (itemId, linkedItemId)
);

ALTER TABLE linkedItems
  ADD CONSTRAINT FK_linked_items_main FOREIGN KEY (itemId) REFERENCES items (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT FK_linked_items_linked FOREIGN KEY (linkedItemId) REFERENCES items (id) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE IF NOT EXISTS events (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  startDate datetime NOT NULL,
  endDate datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments_events (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  eventId BIGINT(20) NOT NULL,
  text varchar(255) NOT NULL,
  creationDate datetime NOT NULL,
  updateDate datetime NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE comments_events
ADD CONSTRAINT FK_events_comments FOREIGN KEY (eventId) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS reservedItems (
  itemId bigint(20) NOT NULL AUTO_INCREMENT,
  eventId BIGINT(20) NOT NULL,
  PRIMARY KEY (itemId, eventId)
);

ALTER TABLE reservedItems
  ADD CONSTRAINT FK_reserved_items_item FOREIGN KEY (itemId) REFERENCES items (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT FK_reserved_items_event FOREIGN KEY (eventId) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE;
