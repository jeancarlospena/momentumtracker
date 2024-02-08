import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import TradeReview from "./TradeReview.jsx";

const OrderBreakdown = () => {
  const { user } = useAuthContext();
  const { index } = useParams();
  return (
    <div>
      {user && user.imports.ordersWithMetrics[index] && (
        <TradeReview
          ticker={user.imports.ordersWithMetrics[index].ticker}
          result={
            user.imports.ordersWithMetrics[index].PNL > 0 ? (
              <span className="won">WON</span>
            ) : (
              <span className="loss">LOSS</span>
            )
          }
          position={user.imports.ordersWithMetrics[index].position}
        ></TradeReview>
      )}
    </div>
  );
};

export default OrderBreakdown;
