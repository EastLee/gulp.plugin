'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _app = require('./app1');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fun = function () {
    function Fun() {
        (0, _classCallCheck3.default)(this, Fun);
    }

    (0, _createClass3.default)(Fun, [{
        key: 'test',
        value: function test() {
            console.info('test');
        }
    }, {
        key: 'done',
        value: function done() {
            console.info('done');
        }
    }]);
    return Fun;
}();

var arr = [1, 2, 3];

var _ref = [].concat(arr),
    a = _ref[0],
    c = _ref[1];

var first = _app2.default.first,
    last = _app2.default.last;
//# sourceMappingURL=app.js.map
