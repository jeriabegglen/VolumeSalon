# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-18 18:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0004_auto_20170418_1206'),
    ]

    operations = [
        migrations.CreateModel(
            name='BoutiqueItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('slug', models.CharField(db_index=True, max_length=200, unique=True)),
                ('retail_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='boutiqueitem', to='salon.Category')),
            ],
            options={
                'ordering': ('name',),
                'verbose_name_plural': 'boutiqueitems',
                'verbose_name': 'boutiqueitem',
            },
        ),
        migrations.AlterIndexTogether(
            name='boutique',
            index_together=set([]),
        ),
        migrations.RemoveField(
            model_name='boutique',
            name='category',
        ),
        migrations.DeleteModel(
            name='Boutique',
        ),
        migrations.AlterIndexTogether(
            name='boutiqueitem',
            index_together=set([('id', 'slug')]),
        ),
    ]