/**
 * Test Cart to hold customer added items for checking pricing at checkout
 */
export class QACart {

private items: { id: number; name: string; price: number; quantity: number }[] = [];

addItem(id: number, name: string, price: number, quantity: number = 1): void {
    const existingItem = this.items.find((item) => item.id === id);
    
    if (existingItem) {
    existingItem.quantity += quantity;
    } else {
    this.items.push({ id, name, price, quantity });
    }
}

removeItem(id: number, quantity: number = 1): void {
    const existingItemIndex = this.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
    const existingItem = this.items[existingItemIndex];

    if (existingItem.quantity > quantity) {
        existingItem.quantity -= quantity;
    } else {
        this.items.splice(existingItemIndex, 1);
    }
    }
}

calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
}

displayCart(): void {
    console.log('Shopping Cart:');
    this.items.forEach((item) => {
    console.log(`${item.name} - Quantity: ${item.quantity} - Price: $${item.price}`);
    });
    console.log('Total: $' + this.calculateTotal());
}
}