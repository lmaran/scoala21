exports.getCheckPage = async (req, res, next) => {
    try {
        res.send("scoala21-" + (process.env.DEPLOYMENT_SLOT || "noslot") + "-" + process.env.NODE_ENV);
    } catch (err) {
        next(err);
        // console.log(err);
    }
};
