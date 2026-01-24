import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { getTrades } from "../scripts/tradesFetcher.js";

const ActiveAccount = () => {
  const { user, dispatch, accountState } = useAuthContext();

  const accountChange = async (e) => {
    const selectedAccount = e.target.value;
    if (user.importAccounts[selectedAccount]) {
      dispatch({ type: "SWAP_ACCOUNT", payload: selectedAccount });
    } else {
      const response = await getTrades(selectedAccount);
      dispatch({
        type: "IMPORT_TRADES",
        payload: { trades: response, account: selectedAccount },
      });
      dispatch({ type: "SWAP_ACCOUNT", payload: selectedAccount });
    }
  };

  return (
    <>
      {user && !user.activeAccount?.unAveilable && (
        <div className="active-bar top-spacer">
          <div className="account-selection">
            <h2 className="basic-title">Account:</h2>
            <select
              defaultValue={user.activeAccount}
              onChange={accountChange}
              className="custom-select"
              name=""
              id=""
            >
              {accountState.map((account, ind) => {
                return (
                  <option key={account._id} value={account._id}>
                    {account.accountName}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <ImportTrades /> */}
          {/* <Link to="/import" className="link-btn highlight-btn">
            Import Trades
          </Link> */}
        </div>
      )}
    </>
  );
};

export default ActiveAccount;
