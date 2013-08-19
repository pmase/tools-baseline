    IMPLEMENTERS: ಥ_ಥ
    delete this block and fill everything out. there are some files in the
    repo to clean up, too. cheers.

# PMASE Tools Prototype: Baseline
[![Build Status](https://travis-ci.org/pmase/tools-baseline.png?branch=master)](https://travis-ci.org/pmase/tools-baseline)

Document your system here.

## Installation

 1. Install Vagrant (1.2.7+)
 2. `vagrant up`
 3. `ssh vagrant@localhost -p 2222`
    - `vagrant` is the password
 4. do awesome things
 5. `vagrant halt`


## Running

 1. `vagrant up --no-provision`
 2. repeat steps 3-5 above


## Testing
 
 1. `grunt` will run the tests
 2. `grunt watch` will run the tests every time you change a file
 
### Acceptance Tests: Behavior Driven Development

See the BDD features defined in `./features`. The functionality of the system
against these expectations is the definition of functionality for the
prototype... the textual output from each of these features should be visible.


### Unit Tests

If you have additional features that don't explicitly fit into user stores,
but are still value-add, you should add tests to `./tests`.


### Coverage

As an added bonus goodness feature, gather test coverage metrics when running
`grunt` and make them available on [coveralls.io](https://coveralls.io/).

### Browser Testing

The test suite needs to be runnable against a local server in the following
browsers:

  - Internet Explorer: 10
  - Chrome(Desktop/Mobile): Latest
  - Firefox: Latest
  - Safari: Mobile

### Headless testing

The test suite needs to be runnable entirely on an open continuous integration
server, such as Travis-CI. This testing should include both the node.js server
as well as a suitable impersonation of a GUI browser, such as PhantomJS and/or
SlimerJS.

### Multi-User, DIL Testing

In an automated environment, a coordinated test between multiple users behind
some form of network should be possible.

## Deploying

TBD

## License
Licensed under the terms of the [MIT License](./LICENSE).
