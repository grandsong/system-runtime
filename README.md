# System Runtime

[![Build Status](https://travis-ci.org/design-first/system-runtime.svg?branch=master)](https://travis-ci.org/design-first/system-runtime)
[![Coverage Status](https://coveralls.io/repos/github/design-first/system-runtime/badge.svg?branch=master)](https://coveralls.io/github/design-first/system-runtime?branch=master)
[![devDependency Status](https://david-dm.org/design-first/system-runtime/dev-status.svg)](https://david-dm.org/design-first/system-runtime#info=devDependencies)
[![Donate](https://liberapay.com/assets/widgets/donate.svg)](https://en.liberapay.com/ecarriou/donate)

## What is System Runtime ?

When you code, you do not create an application, you create in fact a [system](https://en.wikipedia.org/wiki/System).
System Runtime gives you the APIs to create the model, components and behaviors of your system.

## What is a system ?

A system:

* is defined by a model,
* is composed by components and
* reacts to events with behaviors.

![Image Alt](https://designfirst.io/img/system.png)

## How works System Runtime ?

#### Create a system

Use System Runtime APIs to create your system:

```js
// create a system
let system = runtime.system('system');

// add some business logic in the start method
system.on('start', () => console.log('Hello world !'));

// run the system
system.start();
```

Now you can bundle your system into a JSON object:

```js
// create a bundle
runtime.bundle();
```

It will return this JSON:
```json
{
  "_id": "154cd18d0210516",
  "name": "system",
  "description": "",
  "version": "0.0.1",
  "schemas": {},
  "models": {},
  "types": {},
  "behaviors": {
    "1ea9c1d5f811ae1": {
      "_id": "1ea9c1d5f811ae1",
      "component": "154cd18d0210516",
      "state": "start",
      "action": "() => console.log('Hello world !')",
      "useCoreAPI": false,
      "core": false
    }
  },
  "components": {}
}
```

#### Install the bundle in HTML

Just add a link tag in your HTML to install and start your bundle:

```html
<!-- install your bundle -->
<link rel="system" type="application/json" href="system.json">
```

#### Install the bundle in Node.js

Just call *install* API to install and start your bundle:

```js
// require System Runtime
let runtime = require('system-runtime');

// install your bundle 
runtime.install('system.json');
```

## What contains System Runtime ?

![Image Alt](https://designfirst.io/img/archi.png)

#### A metamodel

System Runtime contains a metamodel to help you to design your model. The definition of the model is made on a JSON format called [MSON](https://system-runtime.readme.io/docs/design-your-model#section-mson), no code is needed. 

With [MSON](https://system-runtime.readme.io/docs/design-your-model#section-mson) you can define types, classes, one to one / one to many relationships and multi inheritance between classes. 

[MSON](https://system-runtime.readme.io/docs/design-your-model#section-mson) is based on [UML](http://uml.org), so learning it is very easy.

#### A component factory

System Runtime uses the [Model-Driven Architecture](http://www.omg.org/mda/) approach to create classes based on your design. Use them to instantiate your components. 

#### A NoSQL Database

System Runtime acts as an ODM (Object-Document Mapper) to manage your components as NoSQL Documents. 

System Runtime has a micro NoSQL Database that stores your components and you can export/import them into another System Runtime NoSQL Database. 

Thanks to System Runtime NoSQL Database, you can compose your system with an another system.

#### A workflow engine

System Runtime checks at runtime if the signatures of invoked methods are compliant with your model. 

With System Runtime your components really behave the way you designed them.

## Build

#### Installation

Clone the repository:

```sh
$ git clone https://github.com/design-first/system-runtime.git
```

Once you have cloned the repository, install the dependencies:

```sh
$ npm i
```	 	

#### Build

Then build System Runtime:

```sh
$ npm run build
```	 

It will:
*  generate System Runtime core system in **/build** directory,
*  generate System Runtime core module for the server library,
*  build System Runtime client library on **/dist** directory,
*  run eshint checks and server/client tests.

## Development

To start System Runtime in development mode:

```sh
$ npm run dev
```

All the modifications to the source code of System Runtime will rebuild the project.

## Documentation

* [Quick Start](https://system-runtime.readme.io/docs/quick-start)
* [Guide](https://system-runtime.readme.io/docs/installation)
* [Examples](https://system-runtime.readme.io/docs/a-basic-hello-world)

## Community

* [Code of Conduct](CODE_OF_CONDUCT.md)
* [Contributing Guidelines](CONTRIBUTING.md)

## License

Copyright 2018 Erwan Carriou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 

**Do not use System Runtime if you do not believe in Equality and Diversity.**

**System Runtime is not for people of hate.**