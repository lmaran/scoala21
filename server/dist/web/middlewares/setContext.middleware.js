exports.setContext = async (req, res, next) => {
    req.ctx = {};

    // 1. set requestId
    // req.ctx.requestId = randomstring.generate(8);

    // // 2. set tenantCode
    // req.ctx.tenantCode = urlHelper.getTenantCode(req.subdomains);

    // 3. set selected menu as active
    // let firstSegment = req.path.split("/")[1];
    req.ctx.selectedTopMenu = req.path; // "/profesori"

    next();
};
