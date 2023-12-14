import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import '../../../index.css';
import { useStateContext } from '../../../ContextProvider';

const TradingViewWidgetGraph = () => {
  const { theme } = useStateContext();

  return (
    <div className="candle-chart">
      <div class="container">
        {theme === 'dark-theme' ? (
          <div>
            <h2 className="current-position-heading">Current Position</h2>

            <TradingViewWidget
              theme={Themes.DARK}
              locale="eng"
              width="100%"
              symbol="BINANCE:BTCPERP"
              hide_top_toolbar={true}
              hide_side_toolbar={true}
              hide_bottom_toolbar={true}
              interval={1}
              timezone="UTC"
              containerId="tv_chart_container"
            />
          </div>
        ) : (
          <div>
            <h2 className="current-position-heading">Current Position</h2>

            <TradingViewWidget
              locale="eng"
              width="100%"
              symbol="BINANCE:BTCPERP"
              hide_top_toolbar={true}
              hide_side_toolbar={true}
              hide_bottom_toolbar={true}
              interval={1}
              timezone="UTC"
              containerId="tv_chart_container"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingViewWidgetGraph;
