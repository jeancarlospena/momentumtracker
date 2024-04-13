import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import TradeReview from "./TradeReview.jsx";

const OrderBreakdown = () => {
  const { user } = useAuthContext();
  const { index } = useParams();

  return (
    <div>
      <div className="trades-navigator">
        {index > 0 ? (
          <Link
            className="account-btn-regular"
            to={`/order/${parseInt(index) - 1}`}
          >
            &lt; PREVIOUS TRADE
          </Link>
        ) : (
          <Link className="account-btn-regular account-btn-disabled" to={`#`}>
            &lt; PREVIOUS TRADE
          </Link>
        )}
        {index <
        user.importAccounts[user.activeAccount].ordersWithMetrics.length - 1 ? (
          <Link
            className="account-btn-regular"
            to={`/order/${parseInt(index) + 1}`}
          >
            NEXT TRADE &gt;
          </Link>
        ) : (
          <Link className="account-btn-regular account-btn-disabled" to={`#`}>
            NEXT TRADE &gt;
          </Link>
        )}
      </div>

      {user &&
        user.importAccounts?.[user.activeAccount]?.ordersWithMetrics[index] && (
          <TradeReview
            ticker={
              user.importAccounts[user.activeAccount].ordersWithMetrics[index]
                .ticker
            }
            result={
              user.importAccounts[user.activeAccount].ordersWithMetrics[index]
                .PNL > 0 ? (
                <span className="won">WON</span>
              ) : (
                <span className="loss">LOSS</span>
              )
            }
            position={
              user.importAccounts[user.activeAccount].ordersWithMetrics[index]
                .position
            }
          ></TradeReview>
        )}
    </div>
  );
};

export default OrderBreakdown;
