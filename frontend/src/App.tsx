import { Bounce, ToastContainer } from "react-toastify";
import AllRoutes from "./routes/AllRoutes";




function App() {

  return (
    <>


      <AllRoutes/>
      
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
