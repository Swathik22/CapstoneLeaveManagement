import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Leave } from "./leave/Leave";
import { CreateLeave } from "./leave/CreateLeave";
import { UpdateLeave } from "./leave/UpdateLeave";
import ViewProfile from "./Profile/ViewProfile";
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
     
        <Route
          path="employees"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
               <h4>Employee Login View</h4>
            </AuthorizedRoute>
          }
        />

        <Route path="/viewProfile">
              <Route index element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <ViewProfile loggedInUser={loggedInUser}/>
                </AuthorizedRoute>}
              />                               
        </Route>

        <Route path="/leave">
              <Route index element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                <Leave loggedInUser={loggedInUser}/>
                </AuthorizedRoute>}
              />
              <Route path="/leave/createLeave" element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateLeave loggedInUser={loggedInUser}/>
                </AuthorizedRoute>}
              />
              <Route path="/leave/:id" element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                <UpdateLeave loggedInUser={loggedInUser}/>
                </AuthorizedRoute>}/>                    
        </Route>

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
