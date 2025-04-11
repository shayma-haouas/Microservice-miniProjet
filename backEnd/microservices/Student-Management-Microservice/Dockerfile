FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
EXPOSE 8084
COPY target/Student-Management-Microservice-*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]