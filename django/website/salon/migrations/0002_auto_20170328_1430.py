# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-28 20:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stylist',
            name='stylist_last_name',
            field=models.CharField(default='', max_length=200),
        ),
    ]
