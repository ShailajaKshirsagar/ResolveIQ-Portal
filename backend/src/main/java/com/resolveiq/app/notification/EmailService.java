package com.resolveiq.app.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String toEmail,
                                      String fullName,
                                      String username,
                                      String password) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Registration Successful - College CMS");

        message.setText(
                "Hello " + fullName + ",\n\n" +
                        "Your account has been successfully created in the College Complaint Management System.\n\n" +
                        "Login Details:\n" +
                        "Username: " + username + "\n" +
                        "Password: " + password + "\n\n" +
                        "Please login and change your password after first login.\n\n" +
                        "Regards,\n" +
                        "College Support Team"
        );
        mailSender.send(message);
    }

    public void sendEmail(String email,
                          String subject,
                          String messageText) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(messageText);
        mailSender.send(message);
    }
}
