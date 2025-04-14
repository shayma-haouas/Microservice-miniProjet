package com.example.Student.Management.Microservice.Service;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

@Service
public class ChartService {

    public byte[] generateUserStatsChart(int verifiedUsers, int unverifiedUsers, int blockedUsers) throws IOException {
        // Création du jeu de données
        DefaultCategoryDataset dataset = new DefaultCategoryDataset();
        dataset.addValue(verifiedUsers, "Users", "Vérifiés");
        dataset.addValue(unverifiedUsers, "Users", "Non Vérifiés");
        dataset.addValue(blockedUsers, "Users", "Bloqués");

        // Création du graphique
        JFreeChart chart = ChartFactory.createBarChart(
                "Statistiques des Utilisateurs",   // Titre du graphique
                "Statut",                          // Axe des X
                "Nombre d'utilisateurs",          // Axe des Y
                dataset,                           // Données
                PlotOrientation.VERTICAL,         // Orientation du graphique
                true,                             // Légende
                true,                             // InfoTool
                false                             // URL
        );

        // Convertir le graphique en image
        BufferedImage chartImage = chart.createBufferedImage(600, 400);

        // Convertir l'image en tableau de bytes pour renvoyer dans la réponse
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(chartImage, "png", baos);
        baos.flush();
        return baos.toByteArray();
    }
}
