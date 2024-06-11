import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
// import UserProfileList from "./userProfiles/UserProfileList";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <h4>Start here</h4>
            </AuthorizedRoute>
          }
        />
        {/* <Route
          path="bikes"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Bikes />
            </AuthorizedRoute>
          }
        /> */}
        {/* <Route path="workorders">
          <Route
          index
          element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                  <WorkOrderList />
              </AuthorizedRoute>
          }
          />
          <Route
          path="create"
          element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                  <CreateWorkOrder />
              </AuthorizedRoute>
          }
          />
        </Route> */}
        <Route
          path="employees"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
               <h4>Start here userProfile</h4>
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
