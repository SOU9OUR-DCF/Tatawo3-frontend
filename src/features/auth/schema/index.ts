import { z } from "zod";

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const passwordErrorMessage =
  "- Must have one uppercase letter\n" +
  "- Must have one lowercase letter\n" +
  "- Must have one number";

// Full name validation regex
const fullNameRegex = /^[A-Za-z\s]+$/;
const fullNameErrorMessage = "Full name can only contain letters and spaces.";

// Username validation regex
const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
const usernameErrorMessage =
  "Username must start with a letter and contain no spaces.";

// Restaurant name validation
const restaurantNameRegex = /^[A-Za-z0-9\s'-]+$/;
const restaurantNameErrorMessage =
  "Restaurant name contains invalid characters.";

// Contact number validation
const phoneRegex = /^\+?[0-9]{10,15}$/;
const phoneErrorMessage = "Please enter a valid phone number";

// Register user schema
const registerUserSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .regex(fullNameRegex, fullNameErrorMessage),
    username: z
      .string()
      .min(1, "Username is required")
      .regex(usernameRegex, usernameErrorMessage),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 chars long")
      .regex(passwordRegex, passwordErrorMessage),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 chars long")
      .regex(passwordRegex, passwordErrorMessage),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Register restaurant schema
const registerOrgSchema = z
  .object({
    restaurantName: z
      .string()
      .min(2, "Restaurant name is required")
      .regex(restaurantNameRegex, restaurantNameErrorMessage),
    businessEmail: z
      .string()
      .min(1, "Business email is required")
      .email("Invalid email"),
    address: z.string().min(5, "Address is required"),
    contactNumber: z
      .string()
      .min(1, "Contact number is required")
      .regex(phoneRegex, phoneErrorMessage),
    ownerName: z
      .string()
      .min(1, "Owner name is required")
      .regex(fullNameRegex, fullNameErrorMessage),
    username: z
      .string()
      .min(1, "Username is required")
      .regex(usernameRegex, usernameErrorMessage),
    password: z
      .string()
      .min(8, "Password must be at least 8 chars long")
      .regex(passwordRegex, passwordErrorMessage),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 chars long")
      .regex(passwordRegex, passwordErrorMessage),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// For backward compatibility
const registerSchema = registerUserSchema;

// Login form schema
const loginSchema = z
  .object({
    identifier: z.string().min(1, "Email or username is required"), // Identifier can be either email or username
    password: z
      .string()
      .min(8, "Password must be at least 8 chars long")
      .regex(passwordRegex, passwordErrorMessage),
  })
  .refine(
    (data) =>
      data.identifier.includes("@")
        ? z.string().email().safeParse(data.identifier).success
        : true,
    {
      message: "Invalid email",
      path: ["identifier"],
    },
  );

// Forgot password form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

// Reset password form schema
const resetPasswordBaseSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 chars long")
    .regex(passwordRegex, passwordErrorMessage),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 chars long")
    .regex(passwordRegex, passwordErrorMessage),
  token: z.string().min(1, "Token is required"),
});

const resetPasswordInputsSchema = resetPasswordBaseSchema.omit({
  token: true,
});

const resetPasswordSchema = resetPasswordInputsSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    ["path"]: ["confirmPassword"],
  },
);

const resetPasswordBodySchema = resetPasswordBaseSchema.omit({
  confirmPassword: true,
});

// Verify email form schema with OTP code
const verifyEmailSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export {
  registerSchema,
  registerUserSchema,
  registerOrgSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resetPasswordInputsSchema,
  resetPasswordBodySchema,
  verifyEmailSchema,
};
