import { lazy, Suspense } from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from "./history";

const Homepage = lazy(() => import("../pages/index"));
const addTransaction = lazy(() => import("../pages/addTransaction"));
const editTransaction = lazy(() => import("../pages/editTransaction"));

const Routes = () => {
	return (
		<Router history={history}>
			<Suspense fallback="loading...">
				<Switch>
					<Route exact component={Homepage} path="/" />

					<Route
						exact
						component={addTransaction}
						path="/transaction/create"
					/>

					<Route
						exact
						component={editTransaction}
						path="/transaction/edit/:id"
					/>

					<Redirect to="/" />
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Routes;
