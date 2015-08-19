var locationTemplates = [{
  type: 'pom',
  label: 'Point of manufacture',
}, {
  type: 'pos',
  label: 'Point of sale',
}, {
  type: 'shipFrom',
  label: 'Ship from',
}, {
  type: 'poa',
  label: 'Point of order acceptance',
}, {
  type: 'shipTo',
  label: 'Ship to',
}, {
  type: 'firstUse',
  label: 'First use',
}];

function createWorkingListOfLocations(locationsHash) {

  var list = [];

  var mapped = [];

  var locationsHashKeys = [];

  for (var key in locationsHash) {
    if (locationsHash.hasOwnProperty(key) === true) {
      locationsHashKeys.push(key);
    }
  }

  for (var i = 0; i < locationsHashKeys.length; i++) {
    mapped.push(locationsHash[locationsHashKeys[i]]);
  }

  var unknownTypes = [];

  var locationTemplateTypes = [];

  function checkArray(el, arr) {
    var count = 0;
    arr.forEach(function(currEl, currI, currArr) {
      if (currEl === el) {
        count++;
      }
    });
    if (count !== 0)
      return true;
  }

  function match() {

    locationTemplates.forEach(function(elTemplate, iTemplate, arrTemplate) {

      locationTemplateTypes.push(elTemplate.type);

    });

    locationTemplates.forEach(function(elTemplate, iTemplate, arrTemplate) {
      locationsHashKeys.forEach(function(elKey, iKey, iArr) {
        if (elTemplate.type === elKey) {
          list.push({
            type: elKey,
            label: elTemplate.label,
            address: mapped[iKey].address
          });
        }
      });
    });
  }

  match();

  function pushUnknown() {

    locationsHashKeys.forEach(function(elKey, iKey, arrKey) {

      if (checkArray(elKey, locationTemplateTypes) !== true) {
        unknownTypes.push({
          type: elKey,
          label: elKey,
          address: mapped[iKey].address
        });
      }
    });
    unknownTypes.forEach(function(el, i, arr) {
      list.push(el);
    });
  }

  pushUnknown();

  return list;
}

var result = createWorkingListOfLocations({
  customerRemoteSite: {
    address: {
      line: '4 Main St.'
    }
  },
  shipTo: {
    address: {
      line: '1 Main St.'
    }
  },
  shipFrom: {
    address: {
      line: '2 Main St.'
    }
  },
  poa: {
    address: {
      line: '3 Main St.'
    }
  },
});

console.log(result);