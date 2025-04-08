package com.example.Student.Management.Microservice.Service;


import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public ByteArrayInputStream generateContractPdf(String userName, String contractTitle, String content) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();
            document.add(new Paragraph("Contrat : " + contractTitle));
            document.add(new Paragraph("Nom de l'utilisateur : " + userName));
            document.add(new Paragraph("Contenu du contrat :"));
            document.add(new Paragraph(content));
            document.close();

            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
