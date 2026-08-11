import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (
      data.email === "admin@example.com" &&
      data.password === "123456"
    ) {
      const tokenData = {
        token: "mock-token",
        expiresAt: Date.now() + 5 * 60 * 1000,
      };
      login(JSON.stringify(tokenData));
      navigate("/dashboard");
      return;
    }
    setError("root", {
      message: "Email və ya şifrə yanlışdır.",
    });
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email daxil edin",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Düzgün email daxil edin",
              },
            })}
          />
          {errors.email && (
            <p className="login-error">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifrə</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Şifrə daxil edin",
              minLength: {
                value: 6,
                message: "Şifrə ən azı 6 simvol olmalıdır",
              },
            })}
          />
          {errors.password && (
            <p className="login-error">{errors.password.message}</p>
          )}
        </div>
        {errors.root && (
          <p className="login-error">{errors.root.message}</p>
        )}
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;