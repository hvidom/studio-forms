"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { userPayloadSchema } from "@/lib/userPayloadSchema"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function UserForm() {
  const form = useForm<z.infer<typeof userPayloadSchema>>({
    resolver: zodResolver(userPayloadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      city: "",
      zipcode: "",
    },
  })

  async function onSubmit(values: z.infer<typeof userPayloadSchema>) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const result = (await response.json()) as {
        success?: boolean
        error?: string
      }

      if (result.success) {
        toast.success("User registered successfully!")
        form.reset()
      } else {
        toast.error(`Error: ${result.error}`)
      }
    } catch (error) {
      toast.error("Submission failed. Check your local server connection.")
      console.error(error)
    }
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register User</CardTitle>
        <CardDescription>
          Provide account credentials and physical address details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="user-registration-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* First Name & Last Name Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-first-name">First Name</FieldLabel>
                    <Input
                      {...field}
                      id="user-first-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-last-name">Last Name</FieldLabel>
                    <Input
                      {...field}
                      id="user-last-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="user-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Phone Number Field */}
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-phone">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id="user-phone"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="123-456-7890"
                    autoComplete="tel"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Date of Birth Field */}
            <Controller
              name="dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-dob">Date of Birth</FieldLabel>
                  <Input
                    {...field}
                    id="user-dob"
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* City & Zipcode Grid (Optional Fields) */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-city">City (Optional)</FieldLabel>
                    <Input
                      {...field}
                      id="user-city"
                      aria-invalid={fieldState.invalid}
                      placeholder="New York"
                      autoComplete="address-level2"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="zipcode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-zipcode">Zipcode (Optional)</FieldLabel>
                    <Input
                      {...field}
                      id="user-zipcode"
                      aria-invalid={fieldState.invalid}
                      placeholder="10001"
                      autoComplete="postal-code"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className="w-full justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="user-registration-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
