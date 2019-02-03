// https://github.com/codyseibert/tab-tracker/blob/master/client/.eslintrc.js
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/standard"],
    // add your custom rules here
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        quotes: ["error", "double"],
        indent: ["error", 4]
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
