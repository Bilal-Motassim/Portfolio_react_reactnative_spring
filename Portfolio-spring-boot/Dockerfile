FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /app/target/portfolio-0.1.war .
CMD ["java", "-jar", "portfolio-0.1.war"]