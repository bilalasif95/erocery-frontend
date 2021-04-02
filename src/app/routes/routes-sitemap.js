import React from "react";
import { Route } from "react-router";
import * as paths from "./paths.ts";

export default (
  <Route>
    <Route path={"/category/:slug"} />
    <Route path={"/page/:slug"} />
    <Route path={paths.allBlogsUrl} />
    <Route path={"/blog/:slug"} />
    <Route path={"search?q={q}"} />
  </Route>
);