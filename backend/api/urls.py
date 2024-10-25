from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView, UserProfileView
from .views import EmployeeListCreate, EmployeeDetail, AssetListCreate, AssetDetail
from .views import index
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    AssetCategoryViewSet,
    AssetVendorViewSet,
    AssetMakeViewSet,
    AssetModelViewSet,
    AssetStatusViewSet,
    DepartmentViewSet,
    EmployeeViewSet,
    AssetViewSet,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = DefaultRouter()
router.register(r'asset-categories', AssetCategoryViewSet)
router.register(r'asset-vendors', AssetVendorViewSet)
router.register(r'asset-makes', AssetMakeViewSet)
router.register(r'asset-models', AssetModelViewSet)
router.register(r'asset-statuses', AssetStatusViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'assets', AssetViewSet)


urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('register/', UserRegistrationView.as_view(), name='user-registration'),
    # Asset URLs
    path('assets/', AssetListCreate.as_view(), name='asset-list-create'),
    path('assets/<uuid:pk>/', AssetDetail.as_view(), name='asset-detail'),
    # Employee URLs
    path('employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    path('employees/<uuid:pk>/', EmployeeDetail.as_view(), name='employee-detail'),
    path('api/', include(router.urls)),
    path('', index, name='index'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('api/profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    
]
