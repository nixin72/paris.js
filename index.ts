export default class P {
    private rules: Array<String|P> = [];

    private constructor(token: String, parser?: P) {
        this.rules.concat(token, parser ? parser.rules : []);
        return this;
    }

    public static p(token: String): P {
        return new P(token);
    }

    public static or(par1: P, par2: P): P {
        const p = new P("");
        p.rules.push(par1, par2)
        return new P("")
    }

    public static then(...parser: P[]): P {
        const p = new P("")
        parser.forEach(par => p.rules.push(par));
        return p;
    }

    public parse(input: String): Result {

        console.log(this)
        return new Result([], [], [])
    }
}

class Result {
    private ast: Ast;
    private errors: Err[];
    private warnings: Warn[];

    public constructor(ast: Ast, errors: Err[], warnings: Warn[]) {
        this.ast = ast;
        this.errors = errors;
        this.warnings = warnings;
    }

    public pass (cb: (ast: Ast) => void): Result {
        cb(this.ast);
        return this;
    }

    public fail (cb: (errors: Err[]) => void): Result {
        if (this.errors.length > 0) {
            cb(this.errors);
        }

        return this;
    }

    public warn (cb: (warnings: Warn[]) => void): Result {
        if (this.warnings.length > 0) {
            cb(this.warnings);
        }

        return this;
    }
}

type Ast = Token | Token[]

type Token = {
    name: String,
    value: String,
    line: Number,
    column: Number
}

type Err = {
    type: String,
    message: String
    line: Number,
    column: Number
}

type Warn = Err;
