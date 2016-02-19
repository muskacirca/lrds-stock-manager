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

CALL add_item_comment('SHUSM58-1', 'first comment');
CALL add_item_comment('SHUSM58-1', 'second comment');
CALL add_item_comment('SHUSM58-1', 'third comment');

CALL add_model('PG 52', 'Un micro pour les fréquences basse', 'Shure');
CALL bind_model_to_subCategory('SM 58', 'BASS');
CALL add_item('SHUPG52-1', true, 'PG 52', 'bon état');

CALL add_item_comment('SHUPG52-1', 'first comment');
CALL add_item_comment('SHUPG52-1', 'second comment');
CALL add_item_comment('SHUPG52-1', 'third comment');







