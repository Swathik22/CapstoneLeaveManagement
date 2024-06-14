export default function ViewProfile({loggedInUser}) {

  if (!loggedInUser) {
    return null;
  }
  const imageUrl = `https://localhost:5001/Uploads/${loggedInUser.photo}`;
  return (
    <>
      <div className="loggedInUser-container">
        <img style={{height: 100, width: 100}} src={imageUrl} alt={loggedInUser.firstName} />
        <p>UserName: {loggedInUser.userName}</p>
        <p>Email: {loggedInUser.email}</p>        
        <p>Address: {loggedInUser.address}</p> 
      </div>
    </>
  );
}
