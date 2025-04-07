package com.example.Student.Management.Microservice.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document; // ✅ corriger l'import
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public ByteArrayInputStream generateContractPdf(String userName, String contractTitle, String content) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc);

        document.add(new Paragraph("Contrat : " + contractTitle).setBold().setFontSize(18));
        document.add(new Paragraph("Nom de l'utilisateur : " + userName));
        document.add(new Paragraph("Contenu du contrat :"));
        document.add(new Paragraph(content));

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
