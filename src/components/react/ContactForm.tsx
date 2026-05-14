'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { contactSchema, type ContactInput } from '@/lib/hono';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json<{ success: boolean; message: string }>();

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? 'Unknown error');
      }

      toast.success(json.message);
      reset();
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
      {/* Name */}
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </div>

      {/* Message */}
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us what's on your mind…"
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="field-error">{errors.message.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
