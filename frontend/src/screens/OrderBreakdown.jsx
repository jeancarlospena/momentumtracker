import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import TradeReview from "./TradeReview.jsx";

const OrderBreakdown = () => {
  const { user, loadedTrades } = useAuthContext();
  const { orderid } = useParams();
  // console.log(loadedTrades[user.activeAccount]);
  const selectedOrderIndex = user.importAccounts[user.activeAccount].findIndex(
    (trade) => {
      return trade._id === orderid;
    }
  );

  const nextId =
    selectedOrderIndex > 0
      ? user.importAccounts[user.activeAccount][selectedOrderIndex - 1]._id
      : null;
  const prevId =
    selectedOrderIndex < user.importAccounts[user.activeAccount].length - 1
      ? user.importAccounts[user.activeAccount][selectedOrderIndex + 1]._id
      : null;
  return (
    <div>
      <div className="trades-navigator">
        {prevId ? (
          <Link className="account-btn-regular" to={`/order/${prevId}`}>
            <img
              className="nav-arrow"
              src="/images/nav-arrow.svg"
              alt="navigate arrow"
            />{" "}
            PREVIOUS TRADE
          </Link>
        ) : (
          <Link className="account-btn-regular account-btn-disabled" to={`#`}>
            <img
              className="nav-arrow"
              src="/images/nav-arrow.svg"
              alt="navigate arrow"
            />{" "}
            PREVIOUS TRADE
          </Link>
        )}
        {nextId ? (
          <Link className="account-btn-regular" to={`/order/${nextId}`}>
            NEXT TRADE{" "}
            <img
              className="nav-arrow flipped"
              src="/images/nav-arrow.svg"
              alt="navigate arrow"
            />
          </Link>
        ) : (
          <Link className="account-btn-regular account-btn-disabled" to={`#`}>
            NEXT TRADE &gt;
          </Link>
        )}
      </div>
      {user && selectedOrderIndex > -1 && <TradeReview></TradeReview>}
    </div>
  );
};

export default OrderBreakdown;
