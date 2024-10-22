import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class EmailManager {
  private service = String(process.env.SERVICE);
  private host = String(process.env.HOST);
  private authUser = String(process.env.AUTH_USER);
  private authPass = String(process.env.AUTH_PASS);

  async sendEmail(
    email: string,
    cityName: string,
    temperature: number,
    weatherCondition: number,
    feelsLike: number
  ) {
    // Create a transporter object using the email service and authentication
    const transporter = await nodemailer.createTransport({
      service: this.service,
      host: this.host,
      secure: true,
      auth: {
        user: this.authUser,
        pass: this.authPass,
      },
    });

    // Email content and configuration
    const emailConfig = {
      from: "WeatherSphere <ocmodi2117@gmail.com>",
      to: email,
      subject: `Weather Alert: Threshold Breached for ${cityName}`,
      text: `
        Dear User,

        We are writing to inform you that a weather threshold you have configured has been breached for ${cityName}. Please find the details below:

        Threshold Details:
        - Current Temperature: ${temperature}°C
        - Weather Condition: ${weatherCondition}
        - Feels Like: ${feelsLike}°C

        You can review the weather data and further customize your preferences in your dashboard.

        Stay safe,
        Weather Monitoring System
      `, // Body of the email
    };

    try {
      // Send the email using the transporter
      await transporter.sendMail(emailConfig);
      return {
        status: 200,
        message: "Email sent successfully.",
      };
    } catch (e) {
      // Handle any errors that occur during email sending
      console.error("Error sending email:", e);
      return {
        status: 500,
        message: "Failed to send email.",
      };
    }
  }
}

export default new EmailManager();
