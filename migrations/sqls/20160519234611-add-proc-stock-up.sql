DELIMITER //

CREATE PROCEDURE add_item(
  IN reference VARCHAR(255),
  IN isInStock BOOLEAN,
  IN modelName VARCHAR(255),
  IN stateName VARCHAR(255)
)
  BEGIN

    SET @modelId := (SELECT id FROM models WHERE name = modelName);
    SET @stateId := (SELECT id FROM states WHERE name = stateName);

    INSERT INTO items (reference, isInStock, modelId, stateId, createdAt, updatedAt) VALUES(reference, isInStock, @modelId, @stateId, now(), now());

  END //

CREATE PROCEDURE add_event(
  IN eventName VARCHAR(255),
  IN description TEXT,
  IN startDate DATETIME,
  IN endDate DATETIME
)
  BEGIN

    INSERT INTO events (name, description, startDate, endDate, createdAt, updatedAt) VALUES(eventName, description, startDate, endDate, now(), now());

  END //

CREATE PROCEDURE bind_item_to_event(
  IN eventName VARCHAR(255),
  IN itemName VARCHAR(255)
)
  BEGIN

    SET @eventId := (SELECT id FROM events WHERE name = eventName);
    SET @itemId := (SELECT Id FROM items WHERE reference = itemName);

    INSERT INTO reservedItems (eventId, itemId) VALUES(@eventId, @itemId);

  END //

CREATE PROCEDURE add_event_comment(
  IN eventName VARCHAR(255),
  IN itemReference VARCHAR(255)
)
  BEGIN

    SET @eventId := (SELECT id FROM events WHERE name = eventName);

    INSERT INTO eventComments (text, eventId, author, createdAt, updatedAt) VALUES(text, @eventId, 'lrds', now(), now());

  END //


CREATE PROCEDURE add_brand(
  IN name VARCHAR(255),
  IN description VARCHAR(255)
)
  BEGIN

    INSERT INTO brands (name, description) VALUES(name, description);

  END //


CREATE PROCEDURE add_model(
  IN modelName VARCHAR(255),
  IN description VARCHAR(255),
  IN brandName VARCHAR(255)
)
  BEGIN

    SET @brandId := (SELECT id FROM brands WHERE name = brandName);

    INSERT INTO models (name, description, brandId) VALUES(modelName, description, @brandId);

  END //



CREATE PROCEDURE add_domain(
  IN name VARCHAR(255),
  IN description VARCHAR(255)
)
  BEGIN

    INSERT INTO domains (name, description) VALUES(name, description);

  END //

CREATE PROCEDURE add_category(
  IN name VARCHAR(255),
  IN description VARCHAR(255)
)
  BEGIN

    INSERT INTO categories (name, description) VALUES(name, description);

  END //


CREATE PROCEDURE add_subCategory(
  IN subCategoryName VARCHAR(255),
  IN description VARCHAR(255),
  IN categoryName VARCHAR(255)
)
  BEGIN

    SET @categoryId := (SELECT id FROM categories WHERE name = categoryName);
    INSERT INTO subCategories (name, description, categoryId) VALUES(subCategoryName, description, @categoryId);

  END //

CREATE PROCEDURE bind_model_to_subCategory(
  IN modelName VARCHAR(255),
  IN subCategoryName VARCHAR(255)
)
  BEGIN

    SET @modelId := (SELECT id FROM models WHERE name = modelName);
    SET @subCategoryId := (SELECT Id FROM subCategories WHERE name = subCategoryName);
    INSERT INTO modelCategory (modelId, subCategoryId) VALUES(@modelId, @subCategoryId);

  END //

CREATE PROCEDURE bind_model_to_domain(
  IN modelName VARCHAR(255),
  IN domainName VARCHAR(255)
)
  BEGIN

    SET @modelId := (SELECT id FROM models WHERE name = modelName);
    SET @domainId := (SELECT id FROM domains WHERE name = domainName);
    INSERT INTO modelDomain (modelId, domainId) VALUES(@modelId, @domainId);

  END //


CREATE PROCEDURE add_item_comment(
  IN text VARCHAR(255),
  IN itemReference VARCHAR(255)
)
  BEGIN

    SET @itemId := (SELECT id FROM items WHERE reference = itemReference);

    INSERT INTO itemComments (text, itemId, author, createdAt, updatedAt) VALUES(text, @itemId, 'lrds', now(), now());

  END //


CREATE PROCEDURE add_state(
  IN name VARCHAR(255),
  IN severity INT
)
  BEGIN

    INSERT INTO states (name, severity) VALUES(name, severity);

  END //
