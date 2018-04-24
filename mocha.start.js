// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global assert:true */

'use strict';

// prepare environment for js-data-adapter-tests
import 'babel-polyfill';

import * as JSData from 'js-data';
import JSDataAdapterTests from './node_modules/js-data-adapter/dist/js-data-adapter-tests';
import * as JSDataCloudDatastore from './src/index';

const assert = global.assert = JSDataAdapterTests.assert;
global.sinon = JSDataAdapterTests.sinon;

const datastoreOpts = {
  projectId: process.env.GCLOUD_PROJECT
};

if (process.env.KEYFILE_PATH) {
  datastoreOpts.keyFilename = process.env.KEYFILE_PATH;
}

/**
 * Why a slow adapter? Datastore is eventually consistent, so this reduces the
 * flakiness of the tests.
 */
class SlowAdapter extends JSDataCloudDatastore.CloudDatastoreAdapter {
  create (...args) {
    return super.create(...args).then((result) => {
      return new JSData.utils.Promise((resolve) => {
        setTimeout(() => resolve(result), 500);
      });
    });
  }
  createMany (...args) {
    return super.createMany(...args).then((result) => {
      return new JSData.utils.Promise((resolve) => {
        setTimeout(() => resolve(result), 500);
      });
    });
  }
  update (...args) {
    return super.update(...args).then((result) => {
      return new JSData.utils.Promise((resolve) => {
        setTimeout(() => resolve(result), 500);
      });
    });
  }
  updateAll (...args) {
    return super.updateAll(...args).then((result) => {
      return new JSData.utils.Promise((resolve) => {
        setTimeout(() => resolve(result), 500);
      });
    });
  }
  updateMany (...args) {
    return super.updateMany(...args).then((result) => {
      return new JSData.utils.Promise((resolve) => {
        setTimeout(() => resolve(result), 500);
      });
    });
  }
}

JSDataAdapterTests.init({
  debug: false,
  JSData: JSData,
  Adapter: SlowAdapter,
  adapterConfig: {
    debug: false,
    datastoreOpts: datastoreOpts
  },
  xfeatures: [
    'findBelongsToNested',
    'findBelongsToHasManyNested',
    'findHasManyLocalKeys',
    'findHasManyForeignKeys',
    'findAllInOp',
    'findAllLikeOp',
    'findAllBelongsTo',
    'findAllBelongsToNested',
    'findAllBelongsToHasMany',
    'findAllBelongsToHasManyNested',
    'findAllGroupedWhere',
    'filterOnRelations'
  ]
});

describe('exports', function () {
  it('should have correct exports', function () {
    assert(JSDataCloudDatastore.CloudDatastoreAdapter);
    assert(JSDataCloudDatastore.OPERATORS);
    assert(JSDataCloudDatastore.OPERATORS['==']);
    assert(JSDataCloudDatastore.version);
  });
});
