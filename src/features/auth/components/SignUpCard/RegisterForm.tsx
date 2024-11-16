import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "@/core/components/Alert/Alert";
import styles from "./formShared.module.scss";
import { Button } from "@/core/components/Button/Button";
import { useRegisterMutation } from "../../store/api/gamesApi";
import { RegisterArgs } from "../../types";
import { isErrorWithMessage } from "../../utils/helpers";
import InputWrapper from "../InputWrapper/InputWrapper";
import PasswordConstraint from "../PasswordConstraint/PasswordConstraint";

const defaultValues: RegisterArgs = {
  email: "",
  password: "",
  username: "",
};

export default function RegisterForm() {
  const [runRegister, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterArgs>({ defaultValues });
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);

  const onSubmit = handleSubmit(async (data) => {
    setMessage(null);
    setError(null);
    // check if constraints are met
    if (hasNumber && hasValidChars && hasValidLength) {
      try {
        const { message } = await runRegister(data).unwrap();
        setMessage(message);
      } catch (error) {
        if (isErrorWithMessage(error)) {
          setError(error.data.message);
        } else {
          setError("An unexpected error occurred, please try again.");
        }
      }
    }
  });

  const password = watch("password");
  const { hasNumber, hasValidChars, hasValidLength } = passwordCheck(password);

  return (
    <div>
      <form onSubmit={onSubmit} className={styles["form"]}>
        {/* Messages */}
        {message && (
          <Alert variant="success">
            <Alert.Title>Registration successful.</Alert.Title>
            <Alert.Description>{message}</Alert.Description>
          </Alert>
        )}

        {/* Error Messages */}
        {error && (
          <Alert variant="destructive">
            <Alert.Title>Authentication failed</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert>
        )}

        {/* Username Input */}
        <InputWrapper label="Username" name="username" error={errors.username}>
          <input
            className={styles["form__input"]}
            {...register("username", { required: "* field is required." })}
            type="text"
          />
        </InputWrapper>

        {/* Email Input */}
        <InputWrapper label="Email" name="email" error={errors.email}>
          <input
            className={styles["form__input"]}
            {...register("email", { required: "* field is required." })}
            type="email"
          />
        </InputWrapper>

        {/* Password Input */}
        <InputWrapper label="Password" name="password" error={errors.password}>
          <input
            className={styles["form__input"]}
            {...register("password", { required: "* field is required." })}
            type="password"
          />
        </InputWrapper>

        {/* Password Constraints */}
        <div className="flex flex-col gap-2 px-3 pb-2 mt-[-4px]">
          <PasswordConstraint isValid={hasValidLength} text="at least 8 characters." />
          <PasswordConstraint isValid={hasValidChars} text="at least one special character." />
          <PasswordConstraint isValid={hasNumber} text="at least one number." />
        </div>

        {/* Submit Button */}
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Sign Up
        </Button>
      </form>

      {/* Log In */}
      <div className={styles["action"]}>
        <small>
          Already have an account?
          <NavLink to="/auth/login" className={styles["action__link"]}>
            Login
          </NavLink>
        </small>
      </div>
    </div>
  );
}

// util function to check password strength
function passwordCheck(password: string) {
  const hasNumber = /\d/.test(password);
  const hasValidChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasValidLength = password.length >= 8;
  return { hasNumber, hasValidChars, hasValidLength };
}
