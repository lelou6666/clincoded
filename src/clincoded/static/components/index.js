'use strict';

// Require all components to ensure javascript load ordering
<<<<<<< HEAD:src/encoded/static/components/index.js
require('./lib');
require('./antibody');
=======
>>>>>>> refs/remotes/ClinGen/dev:src/clincoded/static/components/index.js
require('./app');
require('./image');
require('./collection');
require('./dbxref');
require('./errors');
require('./footer');
require('./globals');
require('./home');
require('./item');
require('./page');
require('./mixins');
require('./statuslabel');
require('./search');
require('./publication');
require('./curator');
require('./curation_central');
require('./create_gene_disease');
require('./dashboard');
require('./gdm');
require('./group_curation');
require('./group_submit');
require('./family_curation');
require('./family_submit');
require('./individual_curation');
require('./individual_submit');
require('./experimental_curation');
require('./experimental_submit');
require('./variant_curation');
require('./testing');
require('./edit');
require('./inputs');
<<<<<<< HEAD:src/encoded/static/components/index.js
require('./blocks');
require('./user');
require('./schema');
=======
require('./provisional_curation');
require('./add_curator');
>>>>>>> refs/remotes/ClinGen/dev:src/clincoded/static/components/index.js

module.exports = require('./app');
