CALL lrds.add_domain('SCENE', 'tout ce qui attrait a la scene');
CALL lrds.add_domain('STUDIO', 'tout ce qui attrait au studio');

CALL lrds.add_category('MICRO', 'pour enregggistrer des trucs');
CALL lrds.add_subCategory('DYNAMIQUE', 'pas besoin de 48V', 'MICRO');
CALL lrds.add_subCategory('BASS', 'pour la grosse caisse ou la basse', 'MICRO');

CALL lrds.add_brand('Shure', 'A microphone company');

CALL lrds.add_model('SM 58', 'Un micro tout terrain', 'Shure');

CALL lrds.bind_model_to_domain('SM 58', 'SCENE');
CALL lrds.bind_model_to_domain('SM 58', 'STUDIO');
CALL lrds.bind_model_to_subCategory('SM 58', 'DYNAMIQUE');

CALL lrds.add_state('neuf', 1);
CALL lrds.add_state('bon état', 2);
CALL lrds.add_state('dernier soufle', 3);
CALL lrds.add_state('a réparer', 4);

CALL lrds.add_item('SHUSM58-1', true, 'SM 58', 'neuf');

CALL lrds.add_item_comment('first comment', 'SHUSM58-1');
CALL lrds.add_item_comment('second comment', 'SHUSM58-1');
CALL lrds.add_item_comment('third comment', 'SHUSM58-1');

CALL lrds.add_model('PG 52', 'Un micro pour les fréquences basse', 'Shure');
CALL lrds.bind_model_to_subCategory('SM 58', 'BASS');
CALL lrds.add_item('SHUPG52-1', true, 'PG 52', 'bon état');

CALL lrds.add_item_comment('first comment', 'SHUPG52-1');
CALL lrds.add_item_comment('second comment', 'SHUPG52-1');

CALL lrds.add_category('CARTE SON', 'a utiliser avec des micros');
CALL lrds.add_subCategory('ADAT', 'optical connection 8 IN/OUT', 'CARTE SON');
CALL lrds.add_subCategory('USB', 'connexion en usb', 'CARTE SON');

CALL lrds.add_brand('RME', 'A studio company');
CALL lrds.add_model('FIREFACE UC', 'une carte son 8 entrée 8 sortie, ADAT, etc ...', 'RME');

CALL lrds.bind_model_to_subCategory('FIREFACE UC', 'ADAT');
CALL lrds.bind_model_to_subCategory('FIREFACE UC', 'USB');

CALL lrds.add_item('RMEFIREUC-1', true, 'FIREFACE UC', 'a réparer');







