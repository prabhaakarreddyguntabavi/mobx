import { makeAutoObservable, observable, action } from "mobx";
import {
  FetchedData,
  TransctionProps as DataValues,
  DataOutPut as CreditAndDebit,
  ApiStatus as ApiStatusValues,
  FetchedOutput,
} from "../types/transactionsTypes";

const apiStatusConstants: ApiStatusValues = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export class TransctionStore {
  transactionData: DataValues[] = [];
  transactionLoading: string = apiStatusConstants.initial;
  transactionErrorMes: string = "";

  creditAndDebit: CreditAndDebit[] = [];
  creditAndDebitTransactionLoading: boolean = false;
  creditAndDebitTransactionErrorMes: string = "";

  constructor() {
    makeAutoObservable(this, {
      transactionData: observable,
      creditAndDebit: observable,
      updateData: action.bound,
      deleteTransaction: action.bound,
      updateTransaction: action.bound,
      addTransaction: action.bound,
      fetchData: action.bound,
      updateCreditAndDebitTransaction: action.bound,
      fetchTotalCreditAndDebitData: action.bound,
    });
  }

  async fetchData(userId: number) {
    this.transactionLoading = apiStatusConstants.inProgress;

    let url: string =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": userId.toString(),
    };

    if (userId === 3) {
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
    } else {
      this.transactionLoading = apiStatusConstants.failure;
      this.transactionErrorMes = "Something Went wrong please try again later";
    }
  }

  async getTransactionData(transactionStore: any) {
    const { totalTransactionDetails, userDict, isUserAdmin, userId } =
      transactionStore;

    try {
      await this.fetchData(userId);
      if (isUserAdmin) {
        await userDict.fetchData();
      }
      return { totalTransactionDetails, userDict };
    } catch (error) {
      return { totalTransactionDetails, userDict };
    }
  }

  updateData(data: DataValues[]) {
    this.transactionData = data.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.transactionLoading = apiStatusConstants.success;
  }

  updateTransaction(updateData: DataValues) {
    const previousValue = this.transactionData.find(
      (eachTransaction) => eachTransaction.id === updateData.id
    );

    let updateCreditAndDebit = this.creditAndDebit.map((eachItem) => {
      if (eachItem.type === previousValue?.type) {
        const sum = eachItem.sum - previousValue!.amount;
        const totalAmount = sum + updateData.amount;
        return { ...eachItem, sum: totalAmount };
      } else {
        return eachItem;
      }
    });

    const updateTransaction = {
      ...updateData,
      transactionName: updateData.name,
    };

    this.transactionData.forEach((eachTransaction, index) => {
      if (eachTransaction.id === updateData.id) {
        this.transactionData[index] = updateTransaction;
      }
    });

    this.updateCreditAndDebitTransaction(updateCreditAndDebit);
  }

  addTransaction(addTransactionData: DataValues) {
    const updateCreditAndDebit: CreditAndDebit[] = this.creditAndDebit.map(
      (eachItem) => {
        if (eachItem.type === addTransactionData?.type) {
          const sum = eachItem.sum + addTransactionData!.amount;
          return { ...eachItem, sum };
        } else {
          return eachItem;
        }
      }
    );

    this.creditAndDebit = updateCreditAndDebit;

    const addTransaction = {
      id: addTransactionData.id,
      transactionName: addTransactionData.transaction_name,
      type: addTransactionData.type,
      category: addTransactionData.category,
      amount: addTransactionData.amount,
      date: addTransactionData.date,
      userId: addTransactionData.user_id,
    };

    this.transactionData.unshift(addTransaction);
  }

  deleteTransaction(id: number) {
    const previousValue = this.transactionData.find(
      (eachTransaction) => eachTransaction.id === id
    );

    const updateCreditAndDebit: CreditAndDebit[] = this.creditAndDebit.map(
      (eachItem) => {
        if (eachItem.type === previousValue?.type) {
          const sum = eachItem.sum - previousValue!.amount;
          return { ...eachItem, sum };
        } else {
          return eachItem;
        }
      }
    );

    this.creditAndDebit = updateCreditAndDebit;

    const indexNumber: number = this.transactionData.findIndex(
      (each) => each.id === id
    );
    this.transactionData.splice(indexNumber, 1);
  }

  async fetchTotalCreditAndDebitData(userId: number) {
    let url: string =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
    let headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": userId.toString(),
    };

    if (userId === 3) {
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
        userId === 3
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
