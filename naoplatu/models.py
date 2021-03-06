# coding:utf-8
from django.core.urlresolvers import reverse
from django.db import models
from naoplatu.managers import InvoiceManager


class Invoice(models.Model):

    STATUS_PAID = 'paid'

    user = models.ForeignKey('auth.User')
    org_type = models.CharField()
    org_name = models.CharField()
    org_phone_type = models.CharField()
    org_phone_value = models.CharField()
    org_address = models.CharField()
    org_inn = models.CharField()
    org_cat = models.CharField()
    number = models.PositiveIntegerField()
    date = models.DateField()
    org_bank = models.CharField()
    org_bic = models.CharField()
    org_bank_number = models.CharField()
    wtf_number = models.CharField()
    client_type = models.CharField()
    client_name = models.CharField()
    logo = models.FileField()
    director_sign = models.FileField()
    booker_sign = models.FileField()
    printing = models.FileField()

    org_email = models.EmailField()
    is_regular = models.BooleanField(default=False)
    regular_period = models.PositiveIntegerField()  # In days
    status = models.CharField()

    created = models.DateField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    objects = InvoiceManager()

    def get_absolute_url(self):
        return reverse('blanki-invoice-detail', kwargs={'invoice_id': self.id})


class InvoicePosition(models.Model):

    invoice = models.ForeignKey('Invoice')
    name = models.CharField()
    pos_type = models.CharField(u'Единица')
    number = models.CharField()
    price = models.CharField()


class Act(models.Model):

    invoice = models.OneToOneField('Invoice')
    number = models.PositiveIntegerField()
    date = models.DateField()


class ActPosition(models.Model):

    act = models.ForeignKey('Act')
    name = models.CharField()
    pos_type = models.CharField(u'Единица')
    number = models.CharField()
    price = models.CharField()
