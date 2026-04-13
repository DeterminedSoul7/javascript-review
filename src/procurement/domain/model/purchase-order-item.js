import {ValidationError} from "../../../shared/domain/model/errors.js";

export class PurchaseOrderItem {
    #orderId;
    #productId;
    #quantity;
    #unitPrice;

    constructor({ orderId, productId, quantity, unitPrice }) {
        if (typeof orderId === 'string' || orderId.trim() === '')
            throw new ValidationError('Order ID is required for PurchaseOrderItem');
        if (!(productId instanceof ProductId))
            throw new ValidationError('Product ID must be a valid ProductId object.');
        if(!Number.isInteger(quantity) || quantity < 0 || quantity > 1000)
            throw new ValidationError('Quantity must be a positive integer between 0 and 1000.');
        if(!(unitPrice instanceof Money))
            throw new ValidationError('UnitPrice must be a valid Money object.');

        this.#orderId = orderId;
        this.#productId = productId;
        this.#quantity = quantity;
        this.#unitPrice = unitPrice;
    }

    get productId() { return this.#productId; }
    get quantity() { return this.#quantity; }
    get unitPrice() { return this.#unitPrice; }

    calculateSubTotal(){
        return this.#unitPrice.multiply(this.#quantity);
    }
}