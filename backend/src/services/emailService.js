const nodemailer = require('nodemailer')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  async sendWelcomeEmail(userEmail, userName) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: 'Welcome to Handmade Nexus!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Welcome to Handmade Nexus, ${userName}!</h2>
          <p>We're excited to have you join our community of artisans and handmade enthusiasts.</p>
          <p>Explore unique handcrafted products and connect with talented artisans from across India.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Get Started:</h3>
            <ul>
              <li>Browse our collection of handmade products</li>
              <li>Follow your favorite artisans</li>
              <li>Create your wishlist</li>
              <li>Join our community discussions</li>
            </ul>
          </div>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Happy shopping!</p>
          <p style="color: #666;">The Handmade Nexus Team</p>
        </div>
      `
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log('Welcome email sent to:', userEmail)
    } catch (error) {
      console.error('Failed to send welcome email:', error)
    }
  }

  async sendSellerApprovalEmail(sellerEmail, sellerName) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: sellerEmail,
      subject: 'Seller Account Approved - Handmade Nexus',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Congratulations, ${sellerName}!</h2>
          <p>Your seller account has been approved and you can now start selling on Handmade Nexus.</p>
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Next Steps:</h3>
            <ul>
              <li>Complete your seller profile</li>
              <li>Add your first products</li>
              <li>Set up your payment methods</li>
              <li>Start receiving orders</li>
            </ul>
          </div>
          <p>We're here to support you on your journey. Check out our seller resources and guidelines.</p>
          <p>Best wishes for your success!</p>
          <p style="color: #666;">The Handmade Nexus Team</p>
        </div>
      `
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log('Seller approval email sent to:', sellerEmail)
    } catch (error) {
      console.error('Failed to send seller approval email:', error)
    }
  }

  async sendOrderConfirmationEmail(customerEmail, orderData) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: customerEmail,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Order Confirmed!</h2>
          <p>Thank you for your order. Here are the details:</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order #${orderData.orderId}</h3>
            <p><strong>Total:</strong> ${orderData.total}</p>
            <p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>
            
            <h4>Items:</h4>
            ${orderData.items.map(item => `
              <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                <strong>${item.name}</strong><br>
                <span>Quantity: ${item.quantity} | Price: ${item.price}</span>
              </div>
            `).join('')}
          </div>
          
          <p>You can track your order status in your account dashboard.</p>
          <p>Thank you for supporting handmade artisans!</p>
          <p style="color: #666;">The Handmade Nexus Team</p>
        </div>
      `
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log('Order confirmation email sent to:', customerEmail)
    } catch (error) {
      console.error('Failed to send order confirmation email:', error)
    }
  }

  async sendOTPEmail(email, otp, purpose = 'verification') {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Your OTP for ${purpose}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
          <h2 style="color: #f97316;">Verification Code</h2>
          <p>Your OTP for ${purpose} is:</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #f97316; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log('OTP email sent to:', email)
    } catch (error) {
      console.error('Failed to send OTP email:', error)
      throw error
    }
  }
}

module.exports = new EmailService()
