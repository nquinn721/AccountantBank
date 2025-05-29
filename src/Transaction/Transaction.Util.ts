/**
 * Transaction utility functions
 */

import { Transaction } from './Transaction.entity';

export class TransactionUtil {
  static getTotalOwed(transactions: Transaction[]): number {
    let totalOwed = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'borrow') {
        totalOwed += tx.amount;
      }
      if (tx.type === 'paid') {
        totalOwed -= tx.amount;
      }
    });
    return totalOwed;
  }
}
