FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . /var/www/html

# Enable mysqli extension (and any other required PHP extensions)
RUN docker-php-ext-install mysqli

# Apache rewrite module in case your app needs nice URLs
RUN a2enmod rewrite

# Ensure correct permissions for files and folders
RUN chown -R www-data:www-data /var/www/html

# Expose the default web port
EXPOSE 80

# Default startup command for Apache in foreground
CMD ["apache2-foreground"]
