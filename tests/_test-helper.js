/* global window */
const jsdom = require('jsdom').jsdom

global.document = jsdom().defaultView
global.window = global.document

global.navigator = window.navigator = {}
global.Node = window.Node

global.window.mocha = {}
global.window.beforeEach = beforeEach
global.window.afterEach = afterEach

require('angular/angular')
require('angular-mocks')

global.angular = window.angular
global.inject = global.angular.mock.inject
global.ngModule = global.angular.mock.module

require('../client/src/app')
