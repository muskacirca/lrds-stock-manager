INSERT INTO domains (name) VALUES('SCENE');
INSERT INTO domains (name) VALUES('STUDIO');

INSERT INTO categories (name) VALUES('MICRO');
INSERT INTO subCategories (name, categoryId) VALUES('DYNAMIQUE', 1);
INSERT INTO subCategories (name, categoryId) VALUES('BASS', 1);


INSERT INTO models (name, description, brandId) VALUES('SM58', 'Un micro tout terrain', 1);
INSERT INTO brands (name, description) VALUES('Shure', 'A microphone company');
INSERT INTO modelDomain (domainId, modelId) VALUES(1, 1);
INSERT INTO modelDomain (domainId, modelId) VALUES(2, 1);
INSERT INTO modelCategory (subCategoryId, modelId) VALUES(1, 1);
INSERT INTO items (reference, isInStock, modelId) VALUES('SHUSM58-1', true, 1);
INSERT INTO itemComments (text, createdAt, updatedAt, itemId) VALUES('first comment', now(), now(), 1);
INSERT INTO itemComments (text, createdAt, updatedAt, itemId) VALUES('second comment', now(), now(), 1);
INSERT INTO itemComments (text, createdAt, updatedAt, itemId) VALUES('third comment', now(), now(), 1);



INSERT INTO models (name, description, brandId) VALUES('PGG52', 'Un micro basse fréquence', 1);
INSERT INTO modelDomain (domainId, modelId) VALUES(1, 2);
INSERT INTO modelDomain (domainId, modelId) VALUES(2, 2);
INSERT INTO modelCategory (subCategoryId, modelId) VALUES(1, 2);
INSERT INTO modelCategory (subCategoryId, modelId) VALUES(2, 2);
INSERT INTO items (reference, isInStock, modelId) VALUES('SHUPG52-1', true, 2);
INSERT INTO itemComments (text, createdAt, updatedAt, itemId) VALUES('first comment', now(), now(), 2);
INSERT INTO itemComments (text, createdAt, updatedAt, itemId) VALUES('second comment', now(), now(), 2);
INSERT INTO itemComments (text, createdAt, updatedAt, itemId) VALUES('third comment', now(), now(), 2);



