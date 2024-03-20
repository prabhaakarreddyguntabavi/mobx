import { makeAutoObservable, observable, action } from "mobx";
import Cookies from "js-cookie";

interface DataValues {
  id?: number;
  transactionName?: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  userId?: number;
  transaction_name?: string;
  user_id?: number;
  name?: string;
}
interface FetchedData {
  transactions: DataValues[];
}

interface CreditAndDebit {
  sum: number;
  type: string;
}

interface FetchedOutput {
  totals_credit_debit_transactions?: CreditAndDebit[];
  transaction_totals_admin?: CreditAndDebit[];
}

const jwtToken: string = Cookies.get("jwt_token")!;

export class TransctionStore {
  transactionData: DataValues[] = [];
  transactionLoading: boolean = false;
  transactionErrorMes: string = "";

  creditAndDebit: CreditAndDebit[] = [];
  creditAndDebitTransactionLoading: boolean = false;
  creditAndDebitTransactionErrorMes: string = "";

  constructor() {
    makeAutoObservable(this, {
      transactionData: observable,
      updateData: action,
      deleteTransaction: action,
      updateTransaction: action,
      addTransaction: action,
    });
  }

  async fetchData() {
    let url: string =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": jwtToken,
    };

    if (jwtToken === "3") {
      headers["x-hasura-role"] = "admin";
      url = "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
    }
    const limit: number = 1000;
    const offset: number = 0;

    const queryParams: string = `?limit=${limit}&offset=${offset}`;
    const finalUrl: string = `${url}${queryParams}`;

    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    const response: Response = await fetch(finalUrl, options);
    const responseData: FetchedData = await response.json();

    if (response.ok) {
      const transactionDict: DataValues[] = responseData.transactions.map(
        (eachTransaction) => ({
          id: eachTransaction.id,
          transactionName: eachTransaction.transaction_name,
          type: eachTransaction.type,
          category: eachTransaction.category,
          amount: eachTransaction.amount,
          date: eachTransaction.date,
          userId: eachTransaction.user_id,
        })
      );
      this.updateData(transactionDict);
      this.transactionLoading = true;
    } else {
      this.transactionErrorMes = "Something Went wrong please try again later";
      this.transactionLoading = false;
    }
  }

  updateData(data: DataValues[]) {
    console.log(data);
    this.transactionData = data.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  updateTransaction(updateData: DataValues) {
    const previousValue = this.transactionData.find(
      (eachTransaction) =>
        eachTransaction.id === updateData.id && eachTransaction
    );

    const updateCreditAndDebit = this.creditAndDebit.map((eachItem) => {
      if (eachItem.type === previousValue?.type) {
        const sum = eachItem.sum - previousValue!.amount;
        const totalAmount = sum + updateData.amount;
        return { ...eachItem, sum: totalAmount };
      } else {
        return eachItem;
      }
    });
    this.creditAndDebit = updateCreditAndDebit;

    const updateTransaction = {
      ...updateData,
      transactionName: updateData.name,
    };
    const updatedTransactions: DataValues[] = this.transactionData.map(
      (eachTransaction) => {
        if (eachTransaction.id === updateData.id) {
          return updateTransaction;
        }
        return eachTransaction;
      }
    );
    this.transactionData = updatedTransactions;
    // this.updateData(updatedTransactions);
  }

  addTransaction(addTransactionData: DataValues) {
    const updateCreditAndDebit = this.creditAndDebit.map((eachItem) => {
      if (eachItem.type === addTransactionData?.type) {
        const sum = eachItem.sum + addTransactionData!.amount;
        return { ...eachItem, sum };
      } else {
        return eachItem;
      }
    });
    this.creditAndDebit = updateCreditAndDebit;
    const addTransaction = {
      id: addTransactionData.id,
      transactionName: addTransactionData.transaction_name,
      type: addTransactionData.type,
      category: addTransactionData.category,
      amount: addTransactionData.amount,
      date: addTransactionData.date,
      userId: parseInt(jwtToken),
    };
    this.updateData([...this.transactionData, addTransaction]);
  }

  deleteTransaction(id: number) {
    const previousValue = this.transactionData.find(
      (eachTransaction) => eachTransaction.id === id && eachTransaction
    );

    const updateCreditAndDebit = this.creditAndDebit.map((eachItem) => {
      if (eachItem.type === previousValue?.type) {
        const sum = eachItem.sum - previousValue!.amount;
        return { ...eachItem, sum };
      } else {
        return eachItem;
      }
    });
    this.creditAndDebit = updateCreditAndDebit;
    const updatedData = this.transactionData.filter(
      (eachTransaction) => eachTransaction.id !== id
    );
    this.updateData(updatedData);
  }

  async fetchTotalCreditAndDebitData() {
    let url: string =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": jwtToken,
    };

    if (jwtToken === "3") {
      url =
        "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin";
      headers["x-hasura-role"] = "admin";
    }

    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    const response: Response = await fetch(url, options);
    const responseData: FetchedOutput = await response.json();

    if (response.ok) {
      const outPutData: CreditAndDebit[] = (
        jwtToken === "3"
          ? responseData.transaction_totals_admin
          : responseData.totals_credit_debit_transactions
      )!;
      this.updateCreditAndDebitTransaction(outPutData);
    } else {
      this.creditAndDebitTransactionErrorMes =
        "Something Went wrong please try again later";
    }
  }

  updateCreditAndDebitTransaction(data: CreditAndDebit[]) {
    this.creditAndDebit = data;
  }
}
