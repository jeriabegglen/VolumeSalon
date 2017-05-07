from django.contrib import auth
from django import forms

class AccountForm(forms.ModelForm):
    password = forms.CharField(label='Password',
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat Password',
                                widget=forms.PasswordInput)
    class Meta:
        model = auth.models.User
        fields = ('first_name', 'last_name', 'username', 'password')

    # can provide clean_<fieldName> to any form field to order to clean the value or
    # raise form validation error for the specific field
    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError("Passwords don't match.")
        return cd['password2']


class AccountEditForm(forms.ModelForm):
    class Meta:
        model = auth.models.User
        fields = ['first_name', 'last_name', 'email']


class DatePicker(forms.DateInput):
    template_name = 'datepicker.html'

    class Media:
        js = (
            'js/jquery.min.js',
            'js/jquery-ui.min.js',
        )
        css = {
            'all': (
                'css/jquery-ui.css',
            )
        }


class DateForm(forms.Form):
    date = forms.DateField(widget=DatePicker)
