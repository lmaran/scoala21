(function(customerEmployeeService) {
    const mongoService = require("../../shared/helpers/mongo.service");
    const collection = "customerEmployees";

    // ---------- OData ----------
    customerEmployeeService.getAll = function(odataQuery, next) {
        const query = mongoService.getQuery(odataQuery);
        if (query.$sort === undefined) query.$sort = { name: 1 }; // sort by name (asc)
        mongoService.getAll(collection, query, next);
    };

    // ---------- REST ----------
    customerEmployeeService.create = function(badge, next) {
        mongoService.create(collection, badge, next);
    };

    customerEmployeeService.getById = function(id, next) {
        mongoService.getById(collection, id, next);
    };

    customerEmployeeService.update = function(badge, next) {
        mongoService.update(collection, badge, next);
    };

    customerEmployeeService.remove = function(id, next) {
        mongoService.remove(collection, id, next);
    };

    // ---------- RPC ----------
    customerEmployeeService.getByValue = function(field, value, id, next) {
        mongoService.getByValue(collection, field, value, id, next);
    };
})(module.exports);
