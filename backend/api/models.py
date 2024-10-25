from django.db import models
import uuid


class AssetCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class AssetVendor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class AssetMake(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class AssetModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    make = models.ForeignKey(AssetMake, related_name="models", on_delete=models.CASCADE)  # One make can have many models

    def __str__(self):
        return f"{self.make.name} - {self.name}"

class AssetStatus(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    status = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.status

class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    given_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=100)
    department = models.ForeignKey(Department, related_name="employees", on_delete=models.SET_NULL, null=True, blank=True)  # One department can have many employees
    hire_date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.IntegerField(default=0)  # To track how many times the asset has been updated

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Employee, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.given_name} {self.last_name}"


class Asset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_number = models.PositiveIntegerField(unique=True, blank=True, null=True)  # Auto-incrementing field
    name = models.CharField(max_length=100)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    serial_number = models.CharField(max_length=100, unique=True, blank=True, null=True)  # Unique serial number add this as parameter later on unique=False
    barcode = models.CharField(max_length=200, unique=True, blank=True, null=True)  # Optional barcode
    date_acquired = models.DateField(null=True, blank=True)  # Date when the asset was acquired
    date_disposed = models.DateField(null=True, blank=True)  # Date when the asset was disposed (optional)
    category = models.ForeignKey(AssetCategory, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)  # One category can have many assets
    vendor = models.ForeignKey(AssetVendor, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)  # One vendor can have many assets
    make = models.ForeignKey(AssetMake, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)  # One make can have many assets
    model = models.ForeignKey(AssetModel, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)  # One model can have many assets
    status = models.ForeignKey(AssetStatus, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)  # One status can be associated with many assets
    employee = models.ForeignKey(Employee, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)  # One employee can have many assets
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.IntegerField(default=0)  # To track how many times the asset has been updated
    employee = models.ForeignKey(Employee, related_name="assets", on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.asset_number is None:  # Ensure asset_number is only set if it's not already defined
            last_asset = Asset.objects.all().order_by('asset_number').last()
            if last_asset:
                self.asset_number = last_asset.asset_number + 1
            else:
                self.asset_number = 1  # Start at 1 if no assets exist
        if self.pk is not None:
            self.update_count += 1
        super(Asset, self).save(*args, **kwargs)


    def __str__(self):
        return self.name
class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    given_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=100)
    
    hire_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.given_name} {self.last_name}"

class Asset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    serial_number = models.CharField(max_length=100, unique=True)
    barcode = models.CharField(max_length=100, unique=True, blank=True, null=True)
    date_acquired = models.DateField(null=True, blank=True)
    date_disposed = models.DateField(null=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    update_count = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.update_count += 1
        super(Asset, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

