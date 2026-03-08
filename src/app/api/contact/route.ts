import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECEIVER_EMAILS = [
  "bishwo9898@gmail.com",
  "bishwo.dallakoti@centre.edu",
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: RECEIVER_EMAILS.join(","),
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="margin: 0 0 12px; color: #111827;">New Contact Form Submission</h2>
          <p style="margin: 6px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 6px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 6px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 14px; padding: 14px; border-radius: 8px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for reaching out",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="margin: 0 0 12px; color: #111827;">Thanks for your message, ${name}!</h2>
          <p style="margin: 8px 0; color: #374151; line-height: 1.6;">Thank you for reaching out, I will get back to you shortly.</p>
          <p style="margin: 16px 0 0; color: #6b7280; font-size: 14px;">- Bishwo Biraj Dallakoti</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
