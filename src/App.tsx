import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Nav from "@components/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Nav />
          <Router />
          {/* <Footer /> */}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
