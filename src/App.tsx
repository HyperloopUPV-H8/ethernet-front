import "./App.css";
import { WsHandlerProvider, createWsHandler, fetchBack } from "common";
import { HomePage } from "pages/HomePage/HomePage";
import { useDispatch } from "react-redux";
import { initMeasurements } from "slices/measurementsSlice";
import { initPodData } from "slices/podDataSlice";
import { config, Loader } from "common";
import { SplashScreen } from "components/SplashScreen/SplashScreen";
import { setWebSocketConnection } from "slices/connectionsSlice";

const SERVER_URL = import.meta.env.PROD
    ? `${config.prodServer.ip}:${config.prodServer.port}/${config.paths.websocket}`
    : `${config.devServer.ip}:${config.devServer.port}/${config.paths.websocket}`;

function App() {
    const dispatch = useDispatch();

    return (
        <div className="App">
            <Loader
                promises={[
                    createWsHandler(
                        SERVER_URL,
                        () => dispatch(setWebSocketConnection(true)),
                        () => dispatch(setWebSocketConnection(false))
                    ),
                    fetchBack(
                        import.meta.env.PROD,
                        config.paths.podDataDescription
                    ).then((adapter) => {
                        dispatch(initPodData(adapter));
                        dispatch(initMeasurements(adapter));
                    }),
                ]}
                LoadingView={<SplashScreen />}
                FailureView={<div>Failure</div>}
            >
                {([handler]) => (
                    <WsHandlerProvider handler={handler}>
                        <HomePage />
                    </WsHandlerProvider>
                )}
            </Loader>
        </div>
    );
}

export default App;
