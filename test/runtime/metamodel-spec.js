describe('System Runtime metamodel component', () => {

  // init
  if (typeof window === 'undefined') {
    runtime = require('../../src/runtime.js');
    expect = require('chai').expect;
  }

  it('exists', () => {
    const metamodel = runtime.require('metamodel');

    expect(metamodel).to.not.be.undefined;
  });

  it('can add a schema', () => {
    const metamodel = runtime.require('metamodel');
    metamodel.schema({
      '_name': 'PersonTest',
      '_inherit': ['_Component'],
      'firstName': 'property'
    });

    metamodel.model({
      '_name': 'PersonTest',
      '_inherit': ['_Component'],
      'firstName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
      }
    });

    metamodel.create();

    expect(metamodel.require('PersonTest')).to.not.be.undefined;
  });

  it('can add a type', () => {
    const metamodel = runtime.require('metamodel');

    metamodel.type({
      'name': 'address',
      'type': 'object',
      'schema': {
        'planet': { 'type': 'string', 'mandatory': true }
      }
    });

    metamodel.type({
      'name': 'sex',
      'type': 'string',
      'value': ['male', 'female']
    });

    metamodel.schema({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'sex': 'property',
      'firstName': 'property',
      'lastName': 'property',
      'address': 'property'
    });

    metamodel.model({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'sex': {
        'type': 'sex',
        'readOnly': true,
        'mandatory': true,
        'default': 'male'
      },
      'firstName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
      },
      'lastName': {
        'type': 'string',
        'readOnly': true,
        'mandatory': true,
        'default': ''
      },
      'address': {
        'type': 'address',
        'readOnly': true,
        'mandatory': false,
        'default': {
          planet: ''
        }
      }
    });

    metamodel.create();

    const Person = runtime.require('Person');

    const yoda = new Person({
      'sex': 'male',
      'firstName': 'Yoda',
      'lastName': 'Master',
      'address': {
        'planet': 'Dagobah'
      }
    });

    expect(yoda.address().planet()).equal('Dagobah');
  });

  it('can create a one to one relationship', () => {
    const metamodel = runtime.require('metamodel');

    metamodel.schema({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'sex': 'property',
      'firstName': 'property',
      'lastName': 'property',
      'address': 'property',
      'father': 'link'
    });

    metamodel.model({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'sex': {
        'type': 'sex',
        'readOnly': true,
        'mandatory': true,
        'default': 'male'
      },
      'firstName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
      },
      'lastName': {
        'type': 'string',
        'readOnly': true,
        'mandatory': true,
        'default': ''
      },
      'address': {
        'type': 'address',
        'readOnly': true,
        'mandatory': false,
        'default': {
          planet: ''
        }
      },
      'father': {
        'type': 'Person',
        'readOnly': false,
        'mandatory': false,
        'default': {}
      }
    });

    metamodel.create();

    const Person = runtime.require('Person');

    const anakin = new Person({
      'sex': 'male',
      'firstName': 'Anakin',
      'lastName': 'Skywalker'
    });

    const luke = new Person({
      'sex': 'male',
      'firstName': 'Luke',
      'lastName': 'Skywalkers',
      'father': anakin
    });

    expect(luke.father().firstName()).equal('Anakin');
  });


  it('can can create a one to many relationship', () => {
    const metamodel = runtime.require('metamodel');

    metamodel.schema({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'children': 'collection',
      'sex': 'property',
      'firstName': 'property',
      'lastName': 'property',
      'address': 'property',
      'father': 'link'
    });

    metamodel.model({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'sex': {
        'type': 'sex',
        'readOnly': true,
        'mandatory': true,
        'default': 'male'
      },
      'children': {
        'type': ['Person'],
        'readOnly': true,
        'mandatory': false,
        'default': []
      },
      'firstName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
      },
      'lastName': {
        'type': 'string',
        'readOnly': true,
        'mandatory': true,
        'default': ''
      },
      'address': {
        'type': 'address',
        'readOnly': true,
        'mandatory': false,
        'default': {
          planet: ''
        }
      },
      'father': {
        'type': 'Person',
        'readOnly': false,
        'mandatory': false,
        'default': {}
      }
    });

    metamodel.create();

    const Person = runtime.require('Person');

    const leia = new Person({
      'sex': 'female',
      'firstName': 'Leia Amidala',
      'lastName': 'Skywalker'
    });

    const luke = new Person({
      'sex': 'male',
      'firstName': 'Luke',
      'lastName': 'Skywalker'
    });

    const padme = new Person({
      'sex': 'female',
      'firstName': 'Padme',
      'lastName': 'Amidala',
      'children': [luke, leia]
    });

    expect(padme.children(1).firstName()).equal('Leia Amidala');
  });


  it('can create navigation threw model', () => {
    const metamodel = runtime.require('metamodel');

    metamodel.schema({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'children': 'collection',
      'sex': 'property',
      'firstName': 'property',
      'lastName': 'property',
      'address': 'property',
      'father': 'link',
      'son': 'property'
    });

    metamodel.model({
      '_name': 'Person',
      '_inherit': ['_Component'],
      'sex': {
        'type': 'sex',
        'readOnly': true,
        'mandatory': true,
        'default': 'male'
      },
      'children': {
        'type': ['Person'],
        'readOnly': true,
        'mandatory': false,
        'default': []
      },
      'firstName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
      },
      'lastName': {
        'type': 'string',
        'readOnly': true,
        'mandatory': true,
        'default': ''
      },
      'father': {
        'type': 'Person',
        'readOnly': false,
        'mandatory': false,
        'default': {}
      },
      'address': {
        'type': 'address',
        'readOnly': true,
        'mandatory': false,
        'default': {
          planet: ''
        }
      },
      'son': {
        'type': 'Person',
        'readOnly': false,
        'mandatory': false,
        'default': {}
      }
    });

    metamodel.create();

    const Person = runtime.require('Person');

    const luke = new Person({
      'sex': 'male',
      'firstName': 'Luke',
      'lastName': 'Skywalker'
    });

    const anakin = new Person({
      'sex': 'male',
      'firstName': 'Anakin',
      'lastName': 'Skywalker',
      'son': luke
    });

    const leia = new Person({
      'sex': 'female',
      'firstName': 'Leia Amidala',
      'lastName': 'Skywalker',
      'father': anakin
    });

    expect(leia.father().son().firstName()).equal('Luke');
  });
});
