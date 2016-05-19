CALL add_domain('SCENE', 'tout ce qui attrait a la scene');
CALL add_domain('STUDIO', 'tout ce qui attrait au studio');

CALL add_category('MICRO', 'pour enregggistrer des trucs');
CALL add_subCategory('DYNAMIQUE', 'pas besoin de 48V', 'MICRO');
CALL add_subCategory('BASS', 'pour la grosse caisse ou la basse', 'MICRO');

CALL add_brand('Shure', 'A microphone company');

CALL add_model('SM 58', 'Un micro tout terrain', 'Shure');

CALL bind_model_to_domain('SM 58', 'SCENE');
CALL bind_model_to_domain('SM 58', 'STUDIO');
CALL bind_model_to_subCategory('SM 58', 'DYNAMIQUE');

CALL add_state('neuf', 1);
CALL add_state('bon état', 2);
CALL add_state('dernier soufle', 3);
CALL add_state('a réparer', 4);

CALL add_item('SHUSM58-1', true, 'SM 58', 'neuf');

CALL add_item_comment('first comment', 'SHUSM58-1');
CALL add_item_comment('second comment', 'SHUSM58-1');
CALL add_item_comment('third comment', 'SHUSM58-1');

CALL add_model('PG 52', 'Un micro pour les fréquences basse', 'Shure');
CALL bind_model_to_subCategory('SM 58', 'BASS');
CALL add_item('SHUPG52-1', true, 'PG 52', 'bon état');

CALL add_item_comment('first comment', 'SHUPG52-1');
CALL add_item_comment('second comment', 'SHUPG52-1');

CALL add_category('CARTE SON', 'a utiliser avec des micros');
CALL add_subCategory('ADAT', 'optical connection 8 IN/OUT', 'CARTE SON');
CALL add_subCategory('USB', 'connexion en usb', 'CARTE SON');

CALL add_brand('RME', 'A studio company');
CALL add_model('FIREFACE UC', 'une carte son 8 entrée 8 sortie, ADAT, etc ...', 'RME');

CALL bind_model_to_subCategory('FIREFACE UC', 'ADAT');
CALL bind_model_to_subCategory('FIREFACE UC', 'USB');

CALL add_item('RMEFIREUC-1', true, 'FIREFACE UC', 'a réparer');

CALL add_event('Festival sur le pointes', 'gros festival à vitry sur seine', now(), DATE_ADD(NOW(), INTERVAL 2 HOUR));
CALL bind_item_to_event('Festival sur le pointes', 'SHUSM58-1');
CALL add_event_comment('Festival sur le pointes', 'event comment');

INSERT INTO users (firstName, lastName, login, password, email, enabled)
VALUES ('lrds', 'lrds', 'lrds', '4RCh2u5VgDjlglgZzKAZ5/hGdzcAuLz2EFIHqQcukgY=', 'lrds@com', 1)

# 4RCh2u5VgDjlglgZzKAZ5/hGdzcAuLz2EFIHqQcukgY=   ==> lrds







