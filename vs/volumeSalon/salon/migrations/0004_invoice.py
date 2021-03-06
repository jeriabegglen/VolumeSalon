# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-02 22:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0003_auto_20170429_2327'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('itemId', models.PositiveIntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('name', models.CharField(max_length=200)),
                ('created', models.DateTimeField(auto_now=True)),
                ('transactionId', models.PositiveIntegerField()),
            ],
        ),
    ]
