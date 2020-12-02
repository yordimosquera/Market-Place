// Context helps us avoid creating multiple duplicate props
// This pattern is also called props drilling:
function App() {
    // we want to pass user data down to Header
    const [user] = React.useState({ name: "Fred" });
  
    return (
     {/* first 'user' prop */}
      <Main user={user} />
    );
  }
  
  const Main = ({ user }) => (
    <>
      {/* second 'user' prop */}
      <Header user={user} />
      <div>Main app content...</div>
    </>
  );
  
  const Header = ({ user }) => <header>Welcome, {user.name}!</header>;