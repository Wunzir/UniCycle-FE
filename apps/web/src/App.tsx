import "./App.css";
import Logo from "./assets/UniCycle.png";
function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Sign In
        </h1>
        <img src={Logo} alt = "logo" style={{ display: "block", margin: "0 auto",width: "200px" }} />

        <form>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Don&apos;t have an account? Sign up
        </p>
      </div>
    </div>
  );
}

export default App;