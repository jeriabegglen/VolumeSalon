# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-18 17:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BoutiqueItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('slug', models.CharField(db_index=True, max_length=200, unique=True)),
                ('retail_price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'verbose_name_plural': 'boutiqueItems',
                'ordering': ('name',),
                'verbose_name': 'boutiqueItem',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('slug', models.CharField(db_index=True, max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('client_name', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('notes', models.TextField()),
                ('phone_number', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('slug', models.CharField(db_index=True, max_length=200, unique=True)),
                ('description', models.TextField(blank=True)),
                ('manufacturer', models.CharField(max_length=200)),
                ('salon_cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('retail_cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('in_stock', models.PositiveIntegerField()),
                ('minimum_in_stock', models.PositiveIntegerField()),
                ('sku', models.IntegerField()),
                ('size', models.IntegerField()),
                ('created', models.DateTimeField(auto_now=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='salon.Category')),
            ],
            options={
                'verbose_name_plural': 'products',
                'ordering': ('name',),
                'verbose_name': 'product',
            },
        ),
        migrations.AddField(
            model_name='boutiqueitem',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='boutiqueItems', to='salon.Category'),
        ),
        migrations.AlterIndexTogether(
            name='product',
            index_together=set([('id', 'slug')]),
        ),
        migrations.AlterIndexTogether(
            name='boutiqueitem',
            index_together=set([('id', 'slug')]),
        ),
    ]