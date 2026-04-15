class PaymentService {
  static async processPayment({ total, userId }) {
    console.log(`Processing payment of $${total} for user ${userId}`);
    return { success: true, transactionId: `TXN-${Date.now()}` };
  }
}
module.exports = PaymentService;
