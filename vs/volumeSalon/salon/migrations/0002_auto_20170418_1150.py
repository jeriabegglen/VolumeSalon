# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-18 17:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='client',
            options={'ordering': ('name',), 'verbose_name': 'client', 'verbose_name_plural': 'clients'},
        ),
        migrations.RenameField(
            model_name='client',
            old_name='client_name',
            new_name='name',
        ),
        migrations.AddField(
            model_name='client',
            name='slug',
            field=models.CharField(db_index=True, default='', max_length=200, unique=True),
            preserve_default=False,
        ),
    ]
