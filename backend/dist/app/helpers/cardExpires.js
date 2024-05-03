"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateExpiration(state, date) {
    // Másolat készítése a dátumról, hogy ne módosítsuk az eredeti dátumot
    const expirationDate = new Date(date);
    switch (state) {
        case 1:
            expirationDate.setDate(expirationDate.getDate() + 1); // Add 1 day
            break;
        case 2:
            expirationDate.setDate(expirationDate.getDate() + 2); // Add 2 days
            break;
        case 3:
            expirationDate.setDate(expirationDate.getDate() + 3); // Add 3 days
            break;
        case 4:
            expirationDate.setDate(expirationDate.getDate() + 7); // Add 1 week
            break;
        case 5:
            expirationDate.setDate(expirationDate.getDate() + 14); // Add 2 weeks
            break;
        case 6:
            expirationDate.setDate(expirationDate.getDate() + 21); // Add 3 weeks
            break;
        default:
            throw new Error("Invalid state provided for expiration calculation.");
    }
    return expirationDate;
}
module.exports = calculateExpiration;
