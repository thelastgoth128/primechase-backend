import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService{
    private transporter: nodemailer.Transporter

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })
    }

    async sendPasswordResetEmail(to:string, token:string){
        const resetLink = `http://localhost:3000/reset-password?token=${token}`
        const mailOptions = {
            from: 'primechase-studios',
            to: to,
            subject: 'Password Reset Request',
            html:`
            <div> style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            </div>  
            `,
        }
        await this.transporter.sendMail(mailOptions)
    }

    async sendCreateAccountEmail(to:string,name:string){
        const mailOptions = {
            from: 'primechase-studios',
            to:to,
            subject: 'Welcome to Primechase-Studios',
            html:`
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Hey ${name},</h2>
                <p>Welcome to <strong>Primechase Studios</strong> — we’re thrilled to have you on board!</p>
                <p>Primechase is your creative partner for stunning visual storytelling and design. Whether you're a brand, entrepreneur, or artist, our mission is to help you stand out through <strong>immersive, high-impact visuals</strong> tailored to your unique identity.</p>

                <p><strong>Here’s what we offer:</strong></p>
                <ul>
                    <li><strong>🎨 Graphic Design Services:</strong> Logos, branding kits, social media assets, and more</li>
                    <li><strong>🖥️ Web Design & Development:</strong> Responsive, interactive websites that captivate</li>
                    <li><strong>📸 Visual Content Creation:</strong> Motion graphics, animations, and promotional media</li>
                    <li><strong>📅 Client Booking System:</strong> Schedule consultations and design sessions with ease</li>
                </ul>

                <p>If you have any questions or want to get started on a project, feel free to reach out or book a session directly through your dashboard.</p>
                <p>We’re excited to create something unforgettable with you.</p>

                <p>Warm regards,</p>
                <p><strong>The Primechase Studios Team</strong><br>
                <a href="mailto:contact@primechasestudios.com">contact@primechasestudios.com</a><br>
                <a href="https://www.primechasestudios.com" target="_blank">www.primechasestudios.com</a></p>
            </div>
            `
        }
        await this.transporter.sendMail(mailOptions)
    }
}