import { createHashHistory } from "history";

const history = createHashHistory();
history.listen((_location, action) => {
  if (["PUSH"].includes(action)) {
    if (
      _location.pathname === "/checkout/shipping-options/" ||
      _location.pathname === "/checkout/billing-address/" ||
      _location.pathname === "/checkout/payment/" ||
      _location.pathname === "/bakracheckout/shipping-options/" ||
      _location.pathname === "/bakracheckout/billing-address/" ||
      _location.pathname === "/bakracheckout/payment/"
    ) {
      window.scroll({
        behavior: "smooth",
      });
    } else {
      window.scroll({
        behavior: "smooth",
        top: 0,
      });
    }
  }
});

export { history };
