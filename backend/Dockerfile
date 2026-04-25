# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy JAR from builder
COPY --from=builder /app/target/academia-api-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Environment variables
ENV DB_DRIVER=postgresql
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_NAME=academia_db
ENV DB_USER=postgres
ENV DB_PASSWORD=password
ENV DB_DRIVER_CLASS=org.postgresql.Driver
ENV HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
ENV SERVER_PORT=8080

# Start application
ENTRYPOINT ["java", "-jar", "app.jar"]
