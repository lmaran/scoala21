const express = require("express");

// sub-apps
// --------

const sub1 = express();
sub1.get("/", function(req, res) {
    res.json({ status: "SUCCESS!!!!!!" });
});

const sub2 = express();
sub2.get("/", function(req, res) {
    res.json({
        foo: "bar2345",
        baz: "home",
    });
});

// main app
// --------

const app = express();

app.use("/foo", sub2);
app.use("/", sub1);

// Exports
// -------

module.exports = app;
