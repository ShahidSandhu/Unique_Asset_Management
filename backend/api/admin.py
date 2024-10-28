from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Category, Vendor, Make, Model, Status, Department, Employee, Asset

admin.site.register(Category)
admin.site.register(Vendor)
admin.site.register(Make)
admin.site.register(Model)
admin.site.register(Status)
admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(Asset)
