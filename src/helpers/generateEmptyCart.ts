export function generateEmptyCart(userId: string) {
    return {
        userId: userId,
        isDeleted: false,
        items: []
    }
}
