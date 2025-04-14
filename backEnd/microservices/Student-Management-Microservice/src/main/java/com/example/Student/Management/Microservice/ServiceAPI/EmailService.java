package com.example.Student.Management.Microservice.ServiceAPI;




import com.example.Student.Management.Microservice.Entities.User;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);


    private final JavaMailSender mailSender;
    private final JwtService jwtService;

    public EmailService(JavaMailSender mailSender, JwtService jwtService) {
        this.mailSender = mailSender;
        this.jwtService = jwtService;
    }

    public void sendVerificationEmail(User user) {
        String token = jwtService.generateToken(user);
        String verificationLink = "http://localhost:8084/api/auth/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("azizchahlaoui7@gmail.com");
        message.setTo(user.getEmail());
        message.setSubject("Vérifiez votre e-mail");
        message.setText("Cliquez sur le lien suivant pour vérifier votre compte : " + verificationLink);

        try {
            mailSender.send(message);
        } catch (MailException  e) {
            log.error("Erreur lors de l'envoi de l'email de vérification : ", e);
            throw new RuntimeException("Impossible d'envoyer l'email de vérification.");
        }
    }

    public void sendPasswordResetEmail(User user) {
        String token = jwtService.generateToken(user);
        String resetLink = "http://localhost:4200/reset-password/:token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("azizchahlaoui7@gmail.com"); // <-- IMPORTANT

        message.setTo(user.getEmail());
        message.setSubject("Réinitialisation de votre mot de passe");
        message.setText("Cliquez sur le lien suivant pour réinitialiser votre mot de passe : " + resetLink);
        mailSender.send(message);
    }

}