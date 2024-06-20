import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Leave } from "./leave/Leave";
import { CreateLeave } from "./leave/CreateLeave";
import { UpdateLeave } from "./leave/UpdateLeave";
import ViewProfile from "./Profile/ViewProfile";
import { ApprovePendingLeaves } from "./leave/ApprovePendingLeaves";
import {NewLeaveType} from "./leaveType/NewLeaveType";
import { Home } from "./Home";
import { Holiday } from "./holiday/Holiday";
import { ViewLeaveType } from "./leaveType/ViewLeaveType";
// import UserProfileList from "./userProfiles/UserProfileList";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
             <Home/>
            </AuthorizedRoute>
          }
        />   

        <Route
          path="/ApprovePendingLeaves"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
               <ApprovePendingLeaves/>
            </AuthorizedRoute>
          }
        />
         
        {/* <Route
          path="/employees"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
               <h4>Employee Login View</h4>
            </AuthorizedRoute>
          }
        /> */}

        <Route path="/viewProfile">
              <Route index element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <ViewProfile loggedInUser={loggedInUser}/>
                </AuthorizedRoute>}
              />                               
        </Route>
        <Route path="/leaveType">
            <Route index element={
                <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <ViewLeaveType />
              </AuthorizedRoute>}
              />
              <Route path="/leaveType/createLeaveType" element={
                <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <NewLeaveType/>
                </AuthorizedRoute>}
              />
        </Route>
        

          <Route path="/holiday">
              <Route index element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                <Holiday/>
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
