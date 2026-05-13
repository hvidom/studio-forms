import * as z from "zod";

/** Shared with `UserForm` and `POST /api/users` so validation rules stay aligned. */
export const userPayloadSchema = z.object({
	firstName: z.string().min(1, { error: "First name is required." }),
	lastName: z.string().min(1, { error: "Last name is required." }),
	email: z.string().email({ error: "Invalid email address." }),
	phoneNumber: z.string().min(10, { error: "Phone number must be at least 10 digits." }),
	dateOfBirth: z.string().min(1, { error: "Date of birth is required." }),
	city: z.string().optional(),
	zipcode: z.string().optional(),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;
