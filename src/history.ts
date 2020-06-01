import { createBrowserHistory } from "history";

const history = createBrowserHistory();
history.listen((_location, action) => {
  if (["PUSH"].includes(action)) {
    if(_location.pathname === "/checkout/shipping-options/"
    || _location.pathname === "/checkout/billing-address/"
    || _location.pathname === "/checkout/payment/"
    ){
      window.scroll({
        behavior: "smooth",
      });
    }
    else{
      window.scroll({
        behavior: "smooth",
        top: 0,
      });
    }
  }
});


export { history };
