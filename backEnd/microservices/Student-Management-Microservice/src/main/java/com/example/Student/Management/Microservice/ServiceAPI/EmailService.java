package com.example.Student.Management.Microservice.ServiceAPI;




import com.example.Student.Management.Microservice.Entities.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final JwtService jwtService;

    public EmailService(JavaMailSender mailSender, JwtService jwtService) {
        this.mailSender = mailSender;
        this.jwtService = jwtService;
    }

    public void sendVerificationEmail(User user) {
        String token = jwtService.generateToken(user);
        String verificationLink = "http://localhost:8088/api/auth/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Vérifiez votre e-mail");
        message.setText("Cliquez sur le lien suivant pour vérifier votre compte : " + verificationLink);
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(User user) {
        String token = jwtService.generateToken(user);
        String resetLink = "http://localhost:4200/reset-password/:token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Réinitialisation de votre mot de passe");
        message.setText("Cliquez sur le lien suivant pour réinitialiser votre mot de passe : " + resetLink);
        mailSender.send(message);
    }

}