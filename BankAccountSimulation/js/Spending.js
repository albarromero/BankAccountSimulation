class Spending extends Data {
    static spendingCount = 0;

    constructor(description, value) {
        super(description, value);
        this._id= ++Spending.spendingCount;
    }

    get id() {
        return this._id;
    }
}