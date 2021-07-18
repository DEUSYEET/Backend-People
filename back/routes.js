module.exports = app => {

    const control = require("./controller");

    app.route('/test').get(control.test);
    app.route('/api').get(control.api);
}