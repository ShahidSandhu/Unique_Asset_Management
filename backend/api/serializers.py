from rest_framework import serializers
from .models import Asset, Category, Vendor, Make, Model, Status, Employee
from django.contrib.auth.models import User
from .models import Category, Vendor, Make, Model, Status, Department, Employee, Asset


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create a new user with the provided data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class AssetSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    vendor = serializers.StringRelatedField()
    make = serializers.StringRelatedField()
    model = serializers.StringRelatedField()
    status = serializers.StringRelatedField()
    employee = serializers.StringRelatedField()

    class Meta:
        model = Asset
        fields = ['id', 'serial_number', 'barcode', 'date_acquired', 'date_disposed', 'name', 'description', 'value', 'category', 'vendor', 'make', 'model', 'status', 'employee', 'created_at', 'updated_at', 'update_count']


class EmployeeSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True, read_only=True)  # Display related assets for an employee
    class Meta:
        model = Employee
        fields = ['id', 'given_name', 'last_name', 'email', 'position', 'hire_date', 'updated_at', 'assets']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name"]
        read_only_fields = ["username"]  # Username is read-only in this case


