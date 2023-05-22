from django.db import models


class Product(models.Model):
    product_name = models.CharField(max_length=50, verbose_name='Name')
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.product_name
