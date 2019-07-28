const P = require("../").default

const parseLet = P.keyword("let");
const parseStr = P.string();
const parseOps = P.op("=");
const parseVar = P.wordChar();

const parseAssign = parseLet
      .then(parseVar, parseOps, parseStr)

parseLet.parse("let")
  .pass(data => console.log("pass"))
  .fail(errs => console.log("errs"))
  .warn(warn => console.log("warn"))
