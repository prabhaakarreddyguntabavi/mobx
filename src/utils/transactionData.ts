export const getTransactionData = async (transactionStore: any) => {
  //   const transactionStore = useContext(TransactionContext);
  const { totalTransactionDetails, userDict, isUserAdmin, userId } =
    transactionStore;

  try {
    await totalTransactionDetails.fetchData(userId);
    if (isUserAdmin) {
      await userDict.fetchData();
    }
    return { totalTransactionDetails, userDict };
  } catch (error) {
    return { totalTransactionDetails, userDict };
  }
};
