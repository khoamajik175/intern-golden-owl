# Generated by Django 4.2.3 on 2023-07-07 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("image", models.ImageField(upload_to="")),
                ("name", models.CharField(max_length=50)),
                ("description", models.CharField(max_length=100)),
                ("price", models.FloatField()),
                ("color", models.CharField(max_length=10)),
            ],
        ),
    ]
