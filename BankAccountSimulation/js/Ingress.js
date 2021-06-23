class Ingress extends Data {

    static ingressCount = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Ingress.ingressCount;
    }

    get id() {
        return this._id;
    }

}