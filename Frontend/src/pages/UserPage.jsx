import { useState } from "react";
import { useSelector } from "react-redux";
import Account from "../components/Account";
import Form from "../components/Form";

const UserPage = () => {
  const { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {user?.firstName} {user?.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <Form onCancel={() => setIsEditing(false)} />
        )}
      </div>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default UserPage;
